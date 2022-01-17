package com.bdaf.weapon_shop.service;

import com.bdaf.weapon_shop.entity.Category;
import com.bdaf.weapon_shop.entity.Discount;
import com.bdaf.weapon_shop.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{

    @Autowired
    private CategoryRepository categoryRepository;

    private Category findCategoryByName(String aName) {
        return categoryRepository.findCategoryByName(aName);
    }

    public Category saveCategoryToDatabaseIfNotExists(Category aCategory) {
        Category category = findCategoryByName(aCategory.getName());
        if (category == null) {
            category = categoryRepository.save(aCategory);
        }
        return category;
    }

    @Override
    public List<Category> findAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category findCategoryById(Long aCategoryId) {
        return categoryRepository.findById(aCategoryId).get();
    }

    @Override
    public Category findById(Long aCategoryId) {
        return categoryRepository.findById(aCategoryId).get();
    }


    @Override
    public Category saveDiscountToCategory(Long aCategoryId, Discount aDiscount) {
        Category category = categoryRepository.findById(aCategoryId).get();
        category.addDiscount(aDiscount);
        return categoryRepository.save(category);
    }
}
