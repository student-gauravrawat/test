const VoucherRow = ({ row, index, rows, setRows, onDelete }) => {
  const handleChange = (field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  return (
    <tr className="text-center border-t">
      {/* Account */}
      <td>
        <select
          className="border p-1"
          value={row.account}
          onChange={(e) => handleChange("account", e.target.value)}
        >
          <option value="">Select</option>
          <option>Cash</option>
          <option>Bank</option>
          <option>Sales</option>
        </select>
      </td>

      {/* Amount */}
      <td>
        <input
          type="number"
          className="border p-1"
          value={row.amount}
          onChange={(e) => handleChange("amount", e.target.value)}
        />
      </td>

      {/* TDS */}
      <td>
        <select
          className="border p-1"
          value={row.tds}
          onChange={(e) => handleChange("tds", e.target.value)}
        >
          <option>No</option>
          <option>Yes</option>
        </select>
      </td>

      {/* TDS Type */}
      <td>
        {row.tds === "Yes" && (
          <input
            className="border p-1"
            placeholder="TDS Type"
            value={row.tdsType}
            onChange={(e) =>
              handleChange("tdsType", e.target.value)
            }
          />
        )}
      </td>

      {/* Action */}
      <td>
        <button
          onClick={() => onDelete(index)}
          className="text-red-500"
        >
          ❌
        </button>
      </td>
    </tr>
  );
};

export default VoucherRow;