using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json.Converters;

namespace API.Domain.Entities;

public class SubTask : IEntity
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public Todo Todo { get; set; }

    [Required]
    [Newtonsoft.Json.JsonConverter(typeof(StringEnumConverter))]
    public ProgressStatus Status { get; set; }
}