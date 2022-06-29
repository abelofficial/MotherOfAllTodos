using System.Net;
using API.Application.Results;
using API.Domain.Entities;
using API.Infrastructure.Data;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace API.Application.Queries;

public class GetAllUserTodoSubtasksHandler : BaseHandler<SubTask>, IRequestHandler<GetAllUserTodoSubtasksQuery, IEnumerable<SubTaskResponseDto>>
{
    private readonly HttpContext _context;

    public GetAllUserTodoSubtasksHandler(IMapper mapper, AppDbContext db, IHttpContextAccessor httpContextAccessor)
            : base(mapper, db)
    {
        _context = httpContextAccessor.HttpContext;

    }

    public async Task<IEnumerable<SubTaskResponseDto>> Handle(GetAllUserTodoSubtasksQuery request, CancellationToken cancellationToken)
    {
        var currentUserName = _context.User.Identity.Name;
        var currentUser = await _db.Users.SingleAsync(u => u.Username.Equals(currentUserName));
        if (!await _db.Todos.AnyAsync(td => td.Id == request.Id))
            throw new HttpRequestException($"Todo item with id {request.Id} doesn't exist", null, HttpStatusCode.NotFound);

        var result = await _db.SubTasks.Include(st => st.Todo).Where(u => u.Todo.User.Id == currentUser.Id).Where(st => st.Todo.Id == request.Id).ToListAsync();
        return _mapper.Map<IEnumerable<SubTaskResponseDto>>(result);
    }
}