-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "likecount" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImg" TEXT NOT NULL DEFAULT 'https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg=';
