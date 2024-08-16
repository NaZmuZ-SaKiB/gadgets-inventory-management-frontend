import AddCategory from "@/components/forms/AddCategory";
import CategoryTable from "@/components/tables/CategoryTable";

const CategoryPage = () => {
  return (
    <div className="pt-16 flex-1 p-2 max-w-screen-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-3">Category</h1>

      <div className="border rounded-lg p-4">
        <AddCategory />
      </div>

      <div className="border rounded-lg p-2 mt-3">
        <div>
          <CategoryTable />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
