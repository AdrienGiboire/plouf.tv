require 'twitch_bot/command'

class TwitchBot::Client
  attr_reader :logger, :running, :socket

  def initialize
    @logger = Logger.new(STDOUT)
    @running = false
    @socket = nil
  end

  def send(message)
    @logger.info "< #{message}"
    socket.puts(message)
  end

  def run
    @logger.info 'Preparing to connect'

    @socket = TCPSocket.new('irc.chat.twitch.tv', 6667)
    @running = true

    @socket.puts("PASS #{TWITCH_OAUTH}")
    @socket.puts("NICK #{TWITCH_CHANNEL}")

    @logger.info 'Connected'

    Thread.start do
      while (@running) do
        ready = IO.select([@socket])

        ready[0].each do |s|
          line = s.gets
          match = line.match(/^:(.+)!(.+) PRIVMSG #(.+) :(.+)$/)
          message = match && match[4]
          user = match && match[1]

          if message =~ /^!(.+)/
            TwitchBot::Command.new(client: self, user: user, command: message).run
          end

          @logger.info "> #{line}"
        end
      end
    end
  end

  def stop
    @running = false
  end

  def join channel
    send "JOIN ##{channel}"
  end
end
