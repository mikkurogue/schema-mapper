import "@mantine/core/styles.css";
import "mantine-react-table/styles.css";
import { Dispatch, ReactNode, SetStateAction, useMemo, useState } from "react";
import {
	MRT_TableOptions,
	MantineReactTable,
	useMantineReactTable,
	type MRT_ColumnDef,
} from "mantine-react-table";
import { Button, Loader, Skeleton, rem } from "@mantine/core";
import { IconCheck, IconDownload, IconPlus } from "@tabler/icons-react";
import _ from "lodash";
import { exportToExcel } from "./SchemaMapper/exportToExcel";

type Props = {
	data: any;
	shipments: any[];
	emissionAssets: any[];

	setShipments: any;
	setEmissionAssets: any;

	sheets: string[];
	activeSheet: string;
	fileName: string;
	selector: ReactNode;
};

const SchemaTable = (props: Props) => {
	const [combinedData, setCombinedData] = useState<any>(
		[{ shipments: props.shipments, emissionAssets: props.emissionAssets }] ||
		[],
	);
	const [editedRows, setEditedRows] = useState<Record<string, any>>({});
	const [validations, setValidations] = useState<any>({});

	// Memoize the columns we generate from our input file
	const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
		if (props.activeSheet === "Shipments") {
			return generateColumnNamesFromFile(
				props.shipments,
				setEditedRows,
				editedRows,
				{ validations, setValidations },
			);
		}

		if (props.activeSheet === "Emission assets") {
			return generateColumnNamesFromFile(
				props.emissionAssets,
				setEditedRows,
				editedRows,
				{ validations, setValidations },
			);
		}

		return [];
	}, [props.activeSheet]);

	const handleCreateRow: MRT_TableOptions<any>["onCreatingRowSave"] = async ({
		values,
		exitCreatingMode,
	}) => {
		let shipments = [...props.shipments, values];
		let emissionAssets = [...props.emissionAssets, values];

		if (props.activeSheet === "Shipments") {
			props.setShipments((prev: any) => [...prev, values]);
		}
		if (props.activeSheet === "Emission assets") {
			props.setEmissionAssets((prev: any) => [...prev, values]);
		}

		setCombinedData([
			{
				shipments: shipments,
				emissionAssets: emissionAssets,
			},
		]);

		exitCreatingMode();
	};

	const handleSaveRow = () => {
		if (props.activeSheet === "Shipments") {
			const merged = _.merge([], props.shipments, editedRows);

			setCombinedData([
				{
					shipments: merged,
					emissionAssets: props.emissionAssets,
				},
			]);

			props.setShipments(merged);
		}

		if (props.activeSheet === "Emission assets") {
			const merged = _.merge([], props.emissionAssets, editedRows);

			setCombinedData([
				{
					shipments: props.shipments,
					emissionAssets: merged,
				},
			]);

			props.setEmissionAssets(merged);
		}

		setEditedRows({});
		notifications.show({
			title: `Success`,
			color: "green",
			message: `Saved sheet ${props.activeSheet}`,
			icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
		});
	};

	const convertAndDownloadExcel = () => {
		exportToExcel(props.fileName, combinedData);
	};

	const table = useMantineReactTable({
		columns,
		data:
			props.activeSheet === "Shipments"
				? props.shipments
				: props.emissionAssets,
		editDisplayMode: "cell",
		createDisplayMode: "row",
		onCreatingRowSave: handleCreateRow,
		onEditingRowSave: handleSaveRow,
		renderTopToolbarCustomActions: ({ table }) => {
			return (
				<>
					<Button
						variant="outline"
						rightSection={<IconPlus />}
						onClick={() => {
							table.setCreatingRow(true);
						}}
					>
						Add new row
					</Button>

					<Button
						rightSection={<IconDownload />}
						onClick={convertAndDownloadExcel}
						variant="outline"
					>
						Download as excel
					</Button>
				</>
			);
		},
		renderBottomToolbarCustomActions: () => {
			return (
				<>
					<Button
						variant="outline"
						disabled={Object.keys(editedRows).length === 0}
						onClick={handleSaveRow}
					>
						Save
					</Button>
					{props.selector}
				</>
			);
		},
	});

	return (
		<>
			<MantineReactTable table={table} />
		</>
	);
};

export default SchemaTable;
function generateColumnNamesFromFile(
	shipments: any[],
	setEditedRows: Dispatch<SetStateAction<Record<string, any>>>,
	editedRows: Record<string, any>,
	arg3: { validations: any; setValidations: import("react").Dispatch<any> },
): MRT_ColumnDef<any>[] {
	throw new Error("Function not implemented.");
}
