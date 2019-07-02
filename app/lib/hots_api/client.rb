require 'net/http'
require 'uri'
require 'json'

class HotsAPI::Client
  BASE_URL = 'http://hotsapi.net/api/v1/'

  def self.get(resource)
    uri = URI.parse("#{BASE_URL}#{resource}")
    header = { 'Content-Type': 'application/json' }
    http = Net::HTTP.new(uri.host, uri.port)
    request = Net::HTTP::Get.new(uri.request_uri, header)
    response = http.request(request)
    JSON.parse(response.body)
  end
end
