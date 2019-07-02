class HotsAPI::Heroes
  RESOURCE_NAME = 'heroes'

  def self.get(name=nil)
    HotsAPI::Client.get(RESOURCE_NAME)
  end
end
