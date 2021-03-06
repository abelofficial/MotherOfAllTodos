using API.Domain.Entities;
using Newtonsoft.Json.Converters;

namespace API.Application.Results;

public class TodoResponseDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }

    [Newtonsoft.Json.JsonConverter(typeof(StringEnumConverter))]
    public ProgressStatus Status { get; set; }

    public IEnumerable<SubTaskResponseDto> SubTask { get; set; }

}
