using API.Domain.Entities;
using AutoMapper;

namespace API.Application.Results.Profiles;

public class EntityToResult : Profile
{

    public EntityToResult()
    {
        CreateMap<Project, ProjectResponseDto>();
        CreateMap<Project, ProjectResponseDto>().ReverseMap();
        CreateMap<User, UserResponseDto>();
        CreateMap<Todo, TodoResponseDto>().ReverseMap();
        CreateMap<SubTaskResponseDto, SubTask>().ReverseMap()
       .ForMember(dest =>
            dest.TodoId,
            src => src.MapFrom(it => it.Todo.Id));
    }
}
