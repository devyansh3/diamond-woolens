import CollapsableSidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import OrdersTable from "../components/Orders/OrdersTable";

function Orders() {
    return (
        <div className="bg-gray-200 dark:bg-gray-900 antialiased min-h-full">
            <Navbar />
            <div className="flex h-screen">
                <CollapsableSidebar className="h-full" />

                <main className="bg-gray-200 dark:bg-gray-900  h-full w-full flex flex-col">
                    <div className="flex-grow mt-16 overflow-hidden">
                        <OrdersTable />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Orders;
