using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace WichtelGenerator
{
    public class Participant
    {
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;

        [JsonPropertyName("contact")]
        public string? Contact { get; set; }

        [JsonPropertyName("contactType")]
        public string ContactType { get; set; } = string.Empty;

        [JsonPropertyName("id")]
        public string Id { get; set; } = string.Empty;
    }

    public class Assignment
    {
        [JsonPropertyName("token")]
        public string Token { get; set; } = string.Empty;

        [JsonPropertyName("giverId")]
        public string GiverId { get; set; } = string.Empty;

        [JsonPropertyName("giverName")]
        public string GiverName { get; set; } = string.Empty;

        [JsonPropertyName("receiverName")]
        public string ReceiverName { get; set; } = string.Empty;
    }

    public class AssignmentsData
    {
        [JsonPropertyName("assignments")]
        public List<Assignment> Assignments { get; set; } = new();
    }

    public class DerangementGenerator
    {
        private Random _random = new();

        /// <summary>
        /// Generate a random derangement: a permutation where no element is in its original position.
        /// </summary>
        public List<int> GenerateDerangement(int n)
        {
            List<int> perm = Enumerable.Range(0, n).ToList();
            bool isValidDerangement = false;

            while (!isValidDerangement)
            {
                // Fisher-Yates shuffle
                for (int i = n - 1; i > 0; i--)
                {
                    int j = _random.Next(0, i + 1);
                    (perm[i], perm[j]) = (perm[j], perm[i]);
                }

                // Check if it's a valid derangement
                isValidDerangement = true;
                for (int i = 0; i < n; i++)
                {
                    if (perm[i] == i)
                    {
                        isValidDerangement = false;
                        break;
                    }
                }
            }

            return perm;
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                // Get the path to wichtel.json
                string wichtelPath = args.Length > 0 ? args[0] : "wichtel.json";
                
                if (!File.Exists(wichtelPath))
                {
                    Console.WriteLine($"Error: {wichtelPath} not found.");
                    Console.WriteLine("Usage: dotnet run [path-to-wichtel.json]");
                    return;
                }

                // Read and parse wichtel.json
                Console.WriteLine($"Reading {wichtelPath}...");
                string jsonContent = File.ReadAllText(wichtelPath);
                var participants = JsonSerializer.Deserialize<List<Participant>>(jsonContent) 
                    ?? throw new InvalidOperationException("Failed to parse wichtel.json");

                if (participants.Count == 0)
                {
                    Console.WriteLine("Error: No participants found in wichtel.json");
                    return;
                }

                Console.WriteLine($"Found {participants.Count} participants:");
                foreach (var p in participants)
                {
                    Console.WriteLine($"  - {p.Name} ({p.Id})");
                }

                // Generate derangement
                Console.WriteLine("\nGenerating Secret Santa derangement...");
                var generator = new DerangementGenerator();
                var derangement = generator.GenerateDerangement(participants.Count);

                // Create assignments with tokens
                var assignments = new List<Assignment>();
                var random = new Random();

                for (int i = 0; i < participants.Count; i++)
                {
                    var giver = participants[i];
                    var receiver = participants[derangement[i]];

                    var assignment = new Assignment
                    {
                        Token = Guid.NewGuid().ToString("D"),
                        GiverId = giver.Id,
                        GiverName = giver.Name,
                        ReceiverName = receiver.Name
                    };

                    assignments.Add(assignment);
                    Console.WriteLine($"  {giver.Name} → {receiver.Name}");
                }

                // Write assignments.json
                var assignmentsData = new AssignmentsData { Assignments = assignments };
                string outputPath = args.Length > 1 ? args[1] : "assignments.json";

                var options = new JsonSerializerOptions 
                { 
                    WriteIndented = true,
                    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
                };

                string outputJson = JsonSerializer.Serialize(assignmentsData, options);
                File.WriteAllText(outputPath, outputJson);

                Console.WriteLine($"\n✓ Assignments written to {outputPath}");
                Console.WriteLine($"✓ Generation complete!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                Environment.Exit(1);
            }
        }
    }
}
