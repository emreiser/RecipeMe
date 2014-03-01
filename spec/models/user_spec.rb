require 'spec_helper'

describe User do

  describe "associations" do
    it { should have_and_belong_to_many :favrecipes }
    it { should have_many :baskets }
  end

end


