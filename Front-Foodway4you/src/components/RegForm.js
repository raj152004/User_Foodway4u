export default function RegForm({ formData, handleChange }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2">Restaurant Credentials</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Restaurant Name [cite: 78]</label>
          <input name="restaurantName" type="text" onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md" required />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type [cite: 83]</label>
          <select name="restaurantType" onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md">
            <option>Veg</option>
            <option>Non-Veg</option>
            <option>Fast Food</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Aadhar Card Number [cite: 88]</label>
          <input name="aadhar" type="text" onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">PAN Card Number [cite: 89]</label>
          <input name="pan" type="text" onChange={handleChange} className="mt-1 block w-full p-3 border rounded-md" />
        </div>
      </div>
    </div>
  );
}