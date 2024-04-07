import React, { useState } from "react";
import { Tabs, TabList, TabPanel, TabPanels, Tab } from "@chakra-ui/react";
import CategoriesUpdate from "./Cateroryupdate";
import Productupdates from "./Productupdates";

function Categories() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  return (
    <div className="w-[80%] m-auto mt-4">
      <Tabs className="" isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab
          bg='blue.100'
            _selected={{ color: "blue.500", bg: "green.100" }} // Styling for selected tab
            onClick={() => setSelectedTabIndex(0)} // Set the selected tab index on click
            isSelected={selectedTabIndex === 0} // Check if the tab is selected
          >
            Categories
          </Tab>
          <Tab
           bg='blue.100'
            _selected={{ color: "green.500", bg: "green.100" }} // Styling for selected tab
            onClick={() => setSelectedTabIndex(1)} // Set the selected tab index on click
            isSelected={selectedTabIndex === 1} // Check if the tab is selected
          >
            Products
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CategoriesUpdate />
          </TabPanel>
          <TabPanel>
            <Productupdates />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default Categories;
