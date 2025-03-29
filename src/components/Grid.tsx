import { TableItem } from "../types";

interface GridProps {
  source: TableItem[];
}

const Grid = ({ source: data }: GridProps) => {
  return (
    <table>
      <tbody>
        {data.map((item, index) => {
          const bgColor = item?.isBackgroundColorRed ? "red" : "";
          return (
            <tr key={index} style={{ backgroundColor: bgColor }}>
              <td>{item.name}</td>
              <td>{item.mailReceivedDate}</td>
              <td>{item.solutionSentDate}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Grid;