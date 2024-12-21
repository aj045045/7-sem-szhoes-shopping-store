"use client";
import { useEffect, useState } from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    usePDF,
    Image,
} from "@react-pdf/renderer";
import { PiExportFill, PiKeyReturnFill } from "react-icons/pi";
import { Link } from "@nextui-org/react";
import { DetailTabsInterface} from "./interface";
import { formatNumber } from "@/components/utility/FormatNumber";
import { NumberOfCardInterface } from "@/components/utility/admin/interface";

function BasicDocument() {
    const [image, setImage] = useState("");
    const styles = StyleSheet.create({
        section: {
            margin: 10,
            padding: 10,
        },
        viewer: {
            width: "100%",
            height: "100%",
        },
        table: {
            display: "flex",
            width: "auto",
            marginHorizontal: 10,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#bfbfbf",
        },
        tableRow: {
            flexDirection: "row",
        },
        tableCol: {
            flex: 1,
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#bfbfbf",
        },
        tableColSummaryIndex: { width: "20%", borderStyle: "solid", borderWidth: 1, borderColor: "#bfbfbf", padding: 2 },
        tableColSummary: { width: "40%", borderStyle: "solid", borderWidth: 1, borderColor: "#bfbfbf", padding: 2 },
        tableCell: { margin: "auto", marginVertical: 5, fontSize: 10 },
        pageNumber: {
            position: 'absolute',
            bottom: 20,
            right: 20,
            fontSize: 12,
        },
    });

    const todayDate = () => {
        const d = new Date();
        const dateString = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
        const timeString = `${d.getHours()}:${d.getMinutes()}`;
        return `${dateString} ${timeString}`;
    }

    const tmpImage = "data:image/png;base64,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";

    const PageNumber = ({ pageNumber }: { pageNumber: number }) => (
        <Text style={styles.pageNumber}>{`Page ${pageNumber}`}</Text>
    );

    // const imagePath = "f/image?name=bar-diagram.webp&type=admin/dashboard";

    // fetch(imagePath)
    //     .then(response => {
    //         // Check if the request was successful
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }
    //         // Convert the response to text
    //         return response.json();
    //     })
    //     .then(data => {
    //         setImage(data.data);
    //         // `data` will be a string containing the content of the response
    //         console.log('Fetched data:', `data:image/png;base64,${data.data}`);

    //     })
    //     .catch(error => {
    //         // Handle any errors that occurred during the fetch
    //         console.error('There was a problem with the fetch operation:', error);
    //     });

    const balanceSheet: NumberOfCardInterface[] = [
        { title: "Income", value: "12000" },
        { title: "Expenses", value: "15000" },
        { title: "Order", value: "4500" },
        { title: "Return", value: "15" },
        { title: "Customer", value: "45" },
    ]

    const detailTabsData: DetailTabsInterface[] = [
        {
            title: "Income",
            data: {
                columns: [
                    { key: "product", label: "Product" },
                    { key: "price", label: "Price" },
                    { key: "sold", label: "Sold" },
                    { key: "amount", label: "Amount" },
                ],
                rows: [
                    { key: "1", product: "Intelligent Plastic Tuna", price: "158.00", sold: "10", amount: "1580" },
                    { key: "2", product: "Small Concrete Hat", price: "23.00", sold: "10", amount: "230" },
                    { key: "3", product: "Generic Metal Chair", price: "360.00", sold: "10", amount: "3600" },
                    { key: "4", product: "Ergonomic Rubber Table", price: "455.00", sold: "10", amount: "4550" },
                    { key: "5", product: "Practical Frozen Car", price: "554.00", sold: "10", amount: "5540" },
                    { key: "1", product: "Intelligent Plastic Tuna", price: "158.00", sold: "10", amount: "1580" },
                    { key: "2", product: "Small Concrete Hat", price: "23.00", sold: "10", amount: "230" },
                    { key: "3", product: "Generic Metal Chair", price: "360.00", sold: "10", amount: "3600" },
                    { key: "4", product: "Ergonomic Rubber Table", price: "455.00", sold: "10", amount: "4550" },
                    { key: "5", product: "Practical Frozen Car", price: "554.00", sold: "10", amount: "5540" },
                ]
            }
        },
        {
            title: "Expenses",
            data: {
                columns: [
                    { key: "title", label: "Title" },
                    { key: "description", label: "Description" },
                    { key: "tag", label: "Tag" },
                    { key: "amount", label: "Amount" },
                    { key: "date", label: "Date" },

                ],
                rows: [
                    { key: "1", title: "suscipit", description: "Tempora nesciunt est facilis commodi libero.", tag: "Sports", amount: "176.00", date: "Sun Aug 11 2024 13:20" },
                    { key: "2", title: "nostrum", description: "Eligendi nostrum consequatur nemo deleniti dolor nam alias aut.", tag: "Shoes", amount: "433.00", date: "Sat Aug 10 2024 16:27" },
                    { key: "3", title: "fugit", description: "Consequatur aut autem quisquam ipsam commodi.", tag: "Beauty", amount: "184.00", date: "Sat Aug 10 2024 19:22" },
                    { key: "4", title: "tenetur", description: "Doloremque et aut tenetur incidunt voluptatum ullam cumque sit corporis.", tag: "Games", amount: "349.00", date: "Sat Aug 10 2024 16:31" },
                    { key: "5", title: "delectus", description: "Eaque aut ut consequatur qui deserunt rerum quas itaque.", tag: "Games", amount: "333.00", date: "Sun Aug 11 2024 09:52" },
                    { key: "1", title: "suscipit", description: "Tempora nesciunt est facilis commodi libero.", tag: "Sports", amount: "176.00", date: "Sun Aug 11 2024 13:20" },
                    { key: "2", title: "nostrum", description: "Eligendi nostrum consequatur nemo deleniti dolor nam alias aut.", tag: "Shoes", amount: "433.00", date: "Sat Aug 10 2024 16:27" },
                    { key: "3", title: "fugit", description: "Consequatur aut autem quisquam ipsam commodi.", tag: "Beauty", amount: "184.00", date: "Sat Aug 10 2024 19:22" },
                    { key: "4", title: "tenetur", description: "Doloremque et aut tenetur incidunt voluptatum ullam cumque sit corporis.", tag: "Games", amount: "349.00", date: "Sat Aug 10 2024 16:31" },
                    { key: "5", title: "delectus", description: "Eaque aut ut consequatur qui deserunt rerum quas itaque.", tag: "Games", amount: "333.00", date: "Sun Aug 11 2024 09:52" },

                ]
            }
        },
        {
            title: "Order",
            data: {
                columns: [
                    { key: "product", label: "Product" },
                    { key: "price", label: "Price" },
                    { key: "qty", label: "Qty" },
                    { key: "total", label: "Total" },
                ],
                rows: [
                    { key: "1", product: "Unbranded Concrete Pants", price: "414.00", qty: "10", total: "4140" },
                    { key: "2", product: "Gorgeous Soft Shirt", price: "955.00", qty: "10", total: "9550" },
                    { key: "3", product: "Licensed Cotton Pants", price: "925.00", qty: "10", total: "9250" },
                    { key: "4", product: "Small Concrete Sausages", price: "820.00", qty: "10", total: "820" },
                    { key: "5", product: "Licensed Cotton Shirt", price: "704.00", qty: "10", total: "7040" },
                    { key: "1", product: "Unbranded Concrete Pants", price: "414.00", qty: "10", total: "4140" },
                    { key: "2", product: "Gorgeous Soft Shirt", price: "955.00", qty: "10", total: "9550" },
                    { key: "3", product: "Licensed Cotton Pants", price: "925.00", qty: "10", total: "9250" },
                    { key: "4", product: "Small Concrete Sausages", price: "820.00", qty: "10", total: "820" },
                    { key: "5", product: "Licensed Cotton Shirt", price: "704.00", qty: "10", total: "7040" },
                ]
            }
        },
    ];
    return (
        <Document title="SZhoes_Report" author="SZhoes.com" subject="Report of data">
            {/* FIRST page */}
            <Page size="A4">
                <View style={styles.viewer}>
                    <View style={{ width: "100%", height: "60%", }} >
                        <Text style={{ fontSize: 40, textAlign: "center", margin: 40 }}>Welcome to the</Text>
                        <Text style={{ fontSize: 80, textAlign: "center", margin: 40 }}>SZHOES</Text>
                        <Text style={{ fontSize: 40, textAlign: "center", margin: 40 }}>Report</Text>
                        <Text style={{ fontSize: 20, textAlign: "center", margin: 40 }}>on {todayDate()}</Text>
                    </View>
                    <View style={{ margin: 12, fontSize: 12, textAlign: 'justify', color: '#333', }}>
                        <Text style={{ margin: 5, }}>Dear Readers,</Text>
                        <Text style={{ fontSize: 12, lineHeight: 1.5, letterSpacing: 1 }}>
                            Welcome to the SZHOES Company Report for [Year/Quarter]. We are delighted to present you with an in-depth look into our performance, innovations, and strategic direction.
                            At SZHOES, our commitment to excellence drives everything we do. This report provides a comprehensive overview of our achievements, challenges, and future goals. Here, you&apos;ll find detailed analyses of our financial health, market trends, and operational highlights, all designed to offer you valuable insights into our company&apos;s journey.
                            Thank you for your continued support and interest in SZHOES. We are excited to share our progress with you and look forward to your feedback as we strive to reach new heights.
                        </Text>
                        <Text style={{ margin: 5 }}>Warm regards,</Text>
                        <Text style={{ margin: 5, fontWeight: 800 }}>The SZHOES Team</Text>
                    </View>
                </View>
                <PageNumber pageNumber={1} />
            </Page>
            {/* SECOND PAGE */}
            <Page size="A4">
                <View style={styles.viewer}>
                    <View style={styles.section}>
                        <Text>Summary</Text>
                    </View>
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableRow}>
                            <View style={styles.tableColSummaryIndex}>
                                <Text style={styles.tableCell}>Sr.no</Text>
                            </View>
                            <View style={styles.tableColSummary}>
                                <Text style={styles.tableCell}>Data</Text>
                            </View>
                            <View style={styles.tableColSummary}>
                                <Text style={styles.tableCell}>Value</Text>
                            </View>
                        </View>
                        {/* Table Row */}
                        {balanceSheet.map((val, index) =>
                            <View key={index} style={styles.tableRow}>
                                <View style={styles.tableColSummaryIndex}>
                                    <Text style={styles.tableCell}>{index + 1}</Text>
                                </View>
                                <View style={styles.tableColSummary}>
                                    <Text style={styles.tableCell}>{val.title}</Text>
                                </View>
                                <View style={styles.tableColSummary}>
                                    <Text style={styles.tableCell}>{formatNumber(Number(val.value))}</Text>
                                </View>
                            </View>
                        )}
                    </View>
                </View>
                <PageNumber pageNumber={2} />
            </Page>
            {/* THIRD PAGE */}
            <Page size="A4">
                <View style={styles.section}>
                    <Text>Income</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 500, width: "100%", paddingHorizontal: 20 }}>
                    <Image
                        style={{ height: "100%", width: "100%" }}
                        src={"/temp/bar-diagram.png"}
                    />
                </View>
                <PageNumber pageNumber={3} />
            </Page>
            <Page>
                <View style={styles.viewer}>
                    {detailTabsData.map((tableMap, tableIdx) =>
                        <>
                            <Text style={{ fontSize: 20, textAlign: "center", margin: 10 }}>{tableMap.title}</Text>
                            <View key={tableIdx} style={styles.table}>
                                {/* Table Header */}
                                <View style={styles.tableRow}>
                                    {tableMap.data.columns.map((tableHeader) =>
                                        <View key={tableHeader.key} style={styles.tableCol}>
                                            <Text style={styles.tableCell}>{tableHeader.label}</Text>
                                        </View>
                                    )}
                                </View>
                                {tableMap.data.rows.map((row) =>
                                    <View key={row.key} style={styles.tableRow}>
                                        {tableMap.data.columns.map((column) => (
                                            <View key={column.key} style={styles.tableCol}>
                                                <Text style={styles.tableCell}>{row[column.key]}</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        </>
                    )}
                </View>
                <PageNumber pageNumber={4} />
            </Page>
        </Document >
    );
}

/** The component is used to create a button to export all the data and diagrams into pdf's format
 * @param
 * @returns
 */
export default function PDFComponent() {
    const [isClient, setIsClient] = useState(false);
    const [instance, _] = usePDF({ document: <BasicDocument /> });

    useEffect(() => {
        setIsClient(typeof window !== "undefined");
    }, []);

    if (!isClient) {
        return null;
    }

    const getFormattedFileName = () => {
        const d = new Date();
        const prefix = "Dashboard-Summary";
        const dateString = `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
        const timeString = `${d.getHours()}:${d.getMinutes()}`;
        return `${prefix}_${dateString}_${timeString}.pdf`;
    };
    return (
        <div>
            {instance.url && (
                <Link
                    href={instance.url}
                    // target="_blank"
                    download={getFormattedFileName()}
                    className="flex items-center bg-green-500 text-green-950 py-2 px-3 space-x-1"
                >
                    <PiExportFill className="text-lg" />
                    <span>Export</span>
                </Link>
            )}
            {instance.error && (
                <Link className="flex items-center bg-red-500 text-red-950 py-2 px-3 space-x-1">
                    <PiExportFill className="text-lg" />
                    <span>Error</span>
                </Link>
            )}
        </div>
    );
}
