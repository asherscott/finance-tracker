class User < ApplicationRecord
    has_secure_password

    has_many :journal_entries, -> {order('date')}

    def sub_categories
        entries = self.journal_entries
        entries.map do |entry|
            entry.sub_category
        end.uniq.sort
    end

    def categories
        cats = self.sub_categories
        cats.map do |cat|
            cat.category
        end.uniq.sort
    end
end
