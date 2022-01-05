package com.bdaf.weapon_shop.repository;

import com.bdaf.weapon_shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}