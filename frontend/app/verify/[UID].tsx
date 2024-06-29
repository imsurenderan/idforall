interface Identity {
  name: string;
  uuid: string;
  DOB: string;
}

interface Props {
  executive: Identity | null;
}

const Identity: React.FC<Props> = ({ identity }) => {
  if (!identity) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600 mb-12 text-center">
          Verification Failed!
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-white">
      <h1 className="text-2xl text-green-500 font-bold mb-12">
        Verification Succesful!
      </h1>
      <div className="border p-12 text-center rounded-lg shadow-lg bg-green-500">
        <h2 className="text-xl mt-5 font-bold capitalize">{identity.name}</h2>
        <h3 className="text-lg mt-3 font-bold capitalize">
          DOB: {identity.dob}
        </h3>
        <p className="italic font-bold pt-3 text-xl">
          ID: {identity.uuid}{" "}
          <span className="text-white font-bold text-lg"> ✔</span>
        </p>
      </div>
    </div>
  );
};

export default Identity;
