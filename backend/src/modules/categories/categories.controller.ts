import { Request, Response } from 'express';
import Category from '../categories/categories.model';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { category_name } = req.body;

    console.log(req.body);

    if (!category_name) {
      res.status(400).json({ message: 'Category name is required' });
      return;
    }

    const category = await Category.create({ category_name });
    res.status(201).json({ message: 'Category created successfully', data: category });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Failed to create category' });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const categories = await Category.findAll();

    if (categories.length === 0) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }

    res.status(200).json({ message: 'Categories retrieved successfully', data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Failed to retrieve categories' });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;

    if (!category_name) {
      res.status(400).json({ message: 'Category name is required' });
      return;
    }

    const category = await Category.findByPk(id);
    if (!category) {
      res.status(404).json({ message: 'Category not found' });
      return;
    }

    category.dataValues.category_name = category_name;
    await category.save();

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Failed to update category' });
  }
};
