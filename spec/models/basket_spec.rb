require 'spec_helper'

describe Basket do

  describe "validations" do
    it { should validate_presence_of(:user) }
  end

  describe "associations" do
    it { should have_and_belong_to_many :ingredients }
    it { should belong_to :user }
  end

end





