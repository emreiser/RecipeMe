require 'spec_helper'

describe Favrecipe do

  describe "validations" do
    it { should validate_presence_of(:users) }
  end

  describe "associations" do
    it { should have_and_belong_to_many :users }
  end

end
