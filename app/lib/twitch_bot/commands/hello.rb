module TwitchBot::Commands
  class Hello
    def initialize client:, user:
      @client = client
      @user = user
    end

    def run
      @client.logger.info "USER COMMAND: #{@user} - !hello"
      @client.send "PRIVMSG ##{@user} :Hello, #{@user}!"
    end
  end
end
