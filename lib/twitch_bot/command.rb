require 'twitch_bot/commands/hello'

class TwitchBot::Command
  def initialize client:, user:, command:
    @client = client
    @user = user
    @command = command
  end

  def run
    begin
      Object
        .const_get("TwitchBot::Commands::#{@command.sub('!', '').capitalize.chomp}")
        .new(client: @client, user: @user)
        .run
    rescue NameError
      #@client.send "PRIVMSG ##{@user} :#{@command}: Command not found"
    end
  end
end
