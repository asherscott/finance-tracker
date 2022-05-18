class Category < ApplicationRecord
    has_many :sub_categories

    def journal_entries
        sub_cats = self.sub_categories

        sub_cats.map do |cat|
            cat.journal_entries
        end
    end
end
