import Hero from "../../components/Hero/Hero";
import "./verify_style.css";
import { BACKEND_URL } from "../../lib/constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Result({ result }) {
  if (result) {
    return (
      <div className="verification-result-container">
        <Hero
          title="This certificate was generated by us"
          subtitle={`This certificate was awarded to ${
            result.name
          } on ${result.createdAt.toLocaleString()}`}
          image="/images/ok_image.png"
          imageClass="verify-image"
          reverseLayout={true}
        />
      </div>
    );
  } else {
    return (
      <div className="verification-result-container">
        <Hero
          title="This certificate was not generated by us"
          subtitle="It would be great to have you use Certificate Generator!"
          image="/images/crossmark_image.png"
          imageClass="verify-image"
          reverseLayout={true}
        />
      </div>
    );
  }
}

function Verify() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);

  const handleVerification = async () => {
    if (!params.certificateid) {
      return;
    }

    try {
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/verify/${params.certificateid}`
      );
      if (response.status === 200) {
        setResult(response.data.result);
      }
    } catch (_) {}
    setIsLoading(false);
  };

  useEffect(() => {
    handleVerification();
  }, []);

  return (
    <div className="verification-container">
      {isLoading ? "Loading..." : <Result result={result} />}
    </div>
  );
}

export default Verify;
