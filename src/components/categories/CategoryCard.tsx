import { Box, Typography } from "@mui/material";
import type { Category } from "../../features/categories/categories.types";

type CategoryCardProps = {
  category: Category;
};

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: 280,
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <Box
        component="img"
        src={category.imageUrl}
        alt={category.name}
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          p: 3,
          background: "linear-gradient(to top, rgba(0,0,0,.65), transparent)",
        }}
      >
        <Typography variant="h5" sx={{ color: "white", fontWeight: 700 }}>
          {category.name}
        </Typography>
      </Box>
    </Box>
  );
};

export default CategoryCard;
