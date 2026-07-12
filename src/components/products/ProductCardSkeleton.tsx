import {
  Card,
  CardActions,
  CardContent,
  Skeleton,
} from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Skeleton
        variant="rectangular"
        sx={{ width: "100%", aspectRatio: "1 / 1" }}
        animation="wave"
      />
      <CardContent sx={{ flexGrow: "1" }}>
        <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} animation="wave" />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1.25rem" }}
          animation="wave"
        />
        <Skeleton variant="rounded" width={66} height={24} animation="wave" />
      </CardContent>
      <CardActions>
        <Skeleton
          variant="rounded"
          sx={{ width: "100%", height: "36.5px" }}
          animation="wave"
        />
      </CardActions>
    </Card>
  );
};

export default ProductCardSkeleton;
