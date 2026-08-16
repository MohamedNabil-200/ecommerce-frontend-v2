import { Box } from "@mui/material";
import CategoryCard from "./CategoryCard";
import type { Category } from "../../features/categories/categories.types";

type CategoryGridProps = {
  categories: Category[];
};

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
        },
        gap: 3,
      }}
    >
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </Box>
  );
};

export default CategoryGrid;
