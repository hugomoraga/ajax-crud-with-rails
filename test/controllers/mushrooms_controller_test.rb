require 'test_helper'

class MushroomsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get mushrooms_index_url
    assert_response :success
  end

end
