import { Applicant } from "../../types/datshboard";
import applicants from "./dummy.json";

// TODO: dummy data를 List로부터 받은 데이터로 수정
const ExcelDownloadBtn = () => {
  return <button onClick={() => exportToCsv(applicants)}>엑셀 다운로드</button>;
};

export default ExcelDownloadBtn;

interface DownloadFile {
  data: string;
  fileName: string;
  fileType: "text/csv;charset=utf-8";
}

const downloadFile = ({ data, fileName, fileType }: DownloadFile) => {
  const blob = new Blob([data], { type: fileType });

  const a = document.createElement("a");
  a.download = fileName;
  a.href = window.URL.createObjectURL(blob);
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  a.dispatchEvent(clickEvt);
  a.remove();
};

const exportToCsv = (applicants: Applicant[]) => {
  const headers = [
    "DateOfApplication,Name,Gender,DateOfBirth,Phone,Email,transportation,Address,isChecked",
  ];

  const applicantsCsv = applicants.reduce(
    (acc: string[], applicant: Applicant) => {
      const {
        DateOfApplication,
        name,
        gender,
        DateOfBirth,
        phone,
        email,
        transportation,
        address,
        isChecked,
      } = applicant;

      acc.push(
        [
          DateOfApplication,
          name,
          gender,
          DateOfBirth,
          phone,
          email,
          transportation,
          address,
          isChecked,
        ].join(","),
      );
      return acc;
    },
    [],
  );

  downloadFile({
    data: [...headers, ...applicantsCsv].join("\n"),
    fileName: "applicants.csv",
    fileType: "text/csv;charset=utf-8",
  });
};
