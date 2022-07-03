using System.ComponentModel.DataAnnotations;
using API.Domain.Entities;

namespace API.Application.Commands.Dtos;

public class UpdateSubtaskStatusRequestDto
{

    [Required]
    public ProgressStatus Status { get; set; }
}
