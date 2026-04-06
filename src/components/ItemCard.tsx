interface Item {
  id: string;
  title: string;
  status: string;
  createdAt: Date | string;
}

interface ItemCardProps {
  item: Item;
  onDelete?: (id: string) => void;
}

export function ItemCard({ item, onDelete }: ItemCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex justify-between items-start">
      <div>
        <h3 className="font-medium text-gray-900">{item.title}</h3>
        <span
          className={`inline-block mt-1 text-xs px-2 py-0.5 rounded-full ${
            item.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.status}
        </span>
        <p className="text-xs text-gray-400 mt-1">
          {new Date(item.createdAt).toLocaleDateString()}
        </p>
      </div>
      {onDelete && (
        <button
          onClick={() => onDelete(item.id)}
          className="text-red-500 hover:text-red-700 text-sm"
        >
          Delete
        </button>
      )}
    </div>
  );
}
