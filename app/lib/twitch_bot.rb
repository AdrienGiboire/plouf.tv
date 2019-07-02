require "logger"
require "socket"
require "sqlite3"

module TwitchBot
  VERSION = '1.0.0'
end

require 'twitch_bot/client'

TWITCH_OAUTH = ENV['TWITCH_OAUTH']
TWITCH_CHANNEL = ENV['TWITCH_CHANNEL']

Thread.abort_on_exception = true

if TWITCH_OAUTH.empty? || TWITCH_CHANNEL.empty?
  puts "You need to fill in your own Twitch credentials!"
  exit(1)
end

bot = TwitchBot::Client.new
bot.run
bot.join TWITCH_CHANNEL

while (bot.running) do
  command = gets.chomp

  if command == 'quit'
    bot.stop
  else
    bot.send(command)
  end
end

bot.logger.info 'Exited.'
