using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub   // a hub is a class for communication between the client and server. usually what gets sent back and forth in a model like below
                                 // The Hub class manages connections, groups, and messaging.
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);  // receive message is what the chat.js javascript is looking for as an event
        }
    }
}