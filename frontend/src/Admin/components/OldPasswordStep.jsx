const OldPasswordStep = ({ onNext }) => {
  const [oldPassword, setOldPassword] = useState('');

  return (
    <div className="space-y-3">
      <input
        type="password"
        placeholder="Enter current password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        className="w-full border rounded p-2"
      />
      <div className="flex justify-end">
        <button
          disabled={!oldPassword}
          onClick={onNext}
          className="text-sm px-3 py-1 bg-black text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};