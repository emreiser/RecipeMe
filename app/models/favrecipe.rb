class Favrecipe < ActiveRecord::Base
  has_and_belongs_to_many :users
  validates :users, presence: true
end
