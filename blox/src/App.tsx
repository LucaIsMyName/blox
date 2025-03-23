import React, { useState } from "react";
import { Button, Accordion, Marquee, Badge, Breadcrumb, Modal, Tabs, Drawer, Dropdown, Toggle, Checkbox, Radio } from "./components";
import { TableExample } from "./examples/TableExample";
import { TooltipExample } from "./examples/TooltipExample";
import { FormControlsExample } from "./examples/FormControlsExample";
import { ThemeProvider } from "./theme/ThemeProvider";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<"sm" | "md" | "lg" | "xl">("md");

  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerPlacement, setDrawerPlacement] = useState<"left" | "right" | "top" | "bottom">("right");

  const openModal = (size: "sm" | "md" | "lg" | "xl") => {
    setModalSize(size);
    setIsModalOpen(true);
  };

  const openDrawer = (placement: "left" | "right" | "top" | "bottom") => {
    setDrawerPlacement(placement);
    setIsDrawerOpen(true);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 p-4">
        <div className=" mx-auto">
          <h1 className="text-3xl font-bold mb-8">Blox Component Library Demo</h1>
          <FormControlsExample />
          <section className="mb-10">
            <TooltipExample />
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Dropdown Component</h2>
            <Dropdown
              options={[
                { label: "Option 1", value: "1" },
                { label: "My Option 2", value: "2" },
                { label: "Option 3", value: "3" },
              ]}
              value={1}
              onChange={(e) => e.target.value}
              placeholder="Select an option"
              // variant="primary"
              size="lg"
              fullWidth={true}
              rounded={false}
            />
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Button Component</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Variants</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="danger">Danger</Button>
                  <Button variant="warning">Warning</Button>
                  <Button variant="info">Info</Button>
                  <Button variant="light">Light</Button>
                  <Button
                    asChild
                    variant="dark">
                    Dark
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Sizes</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-medium mb-2">States</h3>
                <div className="flex flex-wrap gap-2">
                  <Button isLoading>Loading</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Styles</h3>
                <div className="flex flex-wrap gap-2">
                  <Button rounded>Rounded</Button>
                  <Button fullWidth>Full Width</Button>
                  <Button leftIcon={<span>👈</span>}>Left Icon</Button>
                  <Button rightIcon={<span>👉</span>}>Right Icon</Button>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Accordion Component</h2>

            <div className="grid gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Basic Accordion</h3>
                <Accordion
                  className=""
                  items={[
                    {
                      title: <span className="">Section 1</span>,
                      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    },
                    {
                      title: "Section 2",
                      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                    },
                    {
                      title: "Section 3",
                      content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
                    },
                  ]}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Allow Multiple</h3>
                <Accordion
                  allowMultiple
                  defaultIndex={[0]}
                  className="border border-gray-200 rounded bg-gray-50"
                  items={[
                    {
                      title: "Section 1",
                      content: "This section is expanded by default.",
                    },
                    {
                      title: "Section 2",
                      content: "You can expand multiple sections at once.",
                    },
                    {
                      title: "Section 3",
                      content: "Try clicking on different headers!",
                    },
                  ]}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Custom Styling</h3>
                <div className="grid gap-4">
                  <Accordion
                    className="border border-blue-200 rounded bg-blue-50 text-blue-800"
                    items={[
                      {
                        title: "Blue Styled Accordion",
                        content: "This accordion uses blue custom styling.",
                      },
                    ]}
                  />
                  <Accordion
                    className="border border-green-200 rounded bg-green-50 text-green-800"
                    items={[
                      {
                        title: "Green Styled Accordion",
                        content: <span className="text-green-500 font-bold">Custom styled content</span>,
                      },
                    ]}
                  />
                  <Accordion
                    className="border border-yellow-200 rounded bg-yellow-50 text-yellow-800"
                    items={[
                      {
                        title: "Yellow Styled Accordion",
                        content: "This accordion uses yellow custom styling.",
                      },
                    ]}
                  />
                  <Accordion
                    className="border border-red-200 rounded bg-red-50 text-red-800"
                    items={[
                      {
                        title: <span className="text-red-500 text-xl font-bold">Red Styled Accordion</span>,
                        content: "This accordion uses red custom styling.",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Marquee Component</h2>

            <div className="grid gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Basic Marquee</h3>
                <Marquee className="border border-gray-200 rounded">
                  <span className="px-4">This is a basic marquee that scrolls text from right to left</span>
                </Marquee>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Direction and Speed</h3>
                <div className="grid gap-4">
                  <Marquee
                    direction="right"
                    speed="slow"
                    className="border border-gray-200 rounded bg-blue-50">
                    <span className="px-4">Right direction, slow speed</span>
                  </Marquee>
                  <Marquee
                    direction="left"
                    speed="fast"
                    className="border border-gray-200 rounded bg-green-50">
                    <span className="px-4">Left direction, fast speed</span>
                  </Marquee>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Behavior Types</h3>
                <div className="grid gap-4">
                  <Marquee
                    behavior="scroll"
                    className="border border-gray-200 rounded bg-yellow-50">
                    <span className="px-4">Scroll behavior (continuous)</span>
                  </Marquee>
                  <Marquee
                    behavior="alternate"
                    className="border border-gray-200 rounded bg-purple-50">
                    <span className="px-4">Alternate behavior (back and forth)</span>
                  </Marquee>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">With Rich Content</h3>
                <Marquee className="border border-gray-200 rounded bg-gray-50">
                  <div className="flex items-center gap-4 px-4">
                    <span className="text-xl">🎉</span>
                    <span className="font-bold">Big Announcement!</span>
                    <span className="text-xl">🎉</span>
                    <span>Check out our new products</span>
                    <span className="text-xl">🛒</span>
                  </div>
                </Marquee>
              </div>
            </div>
          </section>
          {/* Drawer Component Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Drawer Component</h2>

            <div className="grid gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Drawer Positions</h3>
                <div className="flex flex-wrap gap-2">
                  <Button onClick={() => openDrawer("left")}>Left Drawer</Button>
                  <Button onClick={() => openDrawer("right")}>Right Drawer</Button>
                  <Button onClick={() => openDrawer("top")}>Top Drawer</Button>
                  <Button onClick={() => openDrawer("bottom")}>Bottom Drawer</Button>
                </div>
              </div>
            </div>

            {/* Drawer component */}
            <Drawer
              isOpen={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
              placement={drawerPlacement}
              minWidth={200}
              maxWidth="80%"
              minHeight={200}
              maxHeight="50%"
              contentClassName="bg-white w-1/2 shadow-lg"
              backdropClassName="bg-blue-500 bg-opacity-50"
              // Add direct style overrides to make the drawer visible
            >
              <div className="h-full overflow-auto p-4">
                <h3 className="text-xl font-bold mb-4">{drawerPlacement.charAt(0).toUpperCase() + drawerPlacement.slice(1)} Drawer</h3>
                <p>This is a drawer that opens from the {drawerPlacement}.</p>
                <p className="my-4">You can press ESC or click outside to close it.</p>
                <div className="mt-8">
                  <Button onClick={() => setIsDrawerOpen(false)}>Close Drawer</Button>
                </div>
              </div>
            </Drawer>
          </section>

          {/* Added Badge Component Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Badge Component</h2>

            <div className="grid gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Badge Variants</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="info">Info</Badge>
                  <Badge variant="light">Light</Badge>
                  <Badge variant="dark">Dark</Badge>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Badge Sizes</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge size="xs">Extra Small</Badge>
                  <Badge size="sm">Small</Badge>
                  <Badge size="md">Medium</Badge>
                  <Badge size="lg">Large</Badge>
                  <Badge size="xl">Extra Large</Badge>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Badge Styles</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge pill>Pill Badge</Badge>
                  <Badge dot>With Dot</Badge>
                  <Badge outlined>Outlined</Badge>
                  <Badge
                    pill
                    outlined>
                    Pill Outlined
                  </Badge>
                  <Badge
                    dot
                    outlined>
                    Dot Outlined
                  </Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Added Breadcrumb Component Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Breadcrumb Component</h2>

            <div className="grid gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Basic Breadcrumb</h3>
                <Breadcrumb
                  items={[
                    { label: "Home", href: "#" },
                    { label: "Products", href: "#" },
                    { label: "Electronics", href: "#" },
                    { label: "Computers", isActive: true },
                  ]}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">With Home Icon</h3>
                <Breadcrumb
                  showHomeIcon
                  items={[
                    { label: "Home", href: "#" },
                    { label: "Library", href: "#" },
                    { label: "Data", isActive: true },
                  ]}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Custom Separator</h3>
                <Breadcrumb
                  separator=">"
                  items={[
                    { label: "Home", href: "#" },
                    { label: "Category", href: "#" },
                    { label: "Current Page", isActive: true },
                  ]}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Max Items (Collapsed)</h3>
                <Breadcrumb
                  maxItems={3}
                  items={[
                    { label: "Home", href: "#" },
                    { label: "Products", href: "#" },
                    { label: "Electronics", href: "#" },
                    { label: "Computers", href: "#" },
                    { label: "Laptops", href: "#" },
                    { label: "Gaming Laptops", isActive: true },
                  ]}
                />
              </div>
            </div>
          </section>

          {/* Added Modal Component Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Modal Component</h2>

            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Button onClick={() => openModal("sm")}>Small Modal</Button>
                <Button onClick={() => openModal("md")}>Medium Modal</Button>
                <Button onClick={() => openModal("lg")}>Large Modal</Button>
                <Button onClick={() => openModal("xl")}>Extra Large Modal</Button>
              </div>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={`${modalSize.toUpperCase()} Modal Example`}
                size={modalSize}
                footer={
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setIsModalOpen(false)}>
                      Confirm
                    </Button>
                  </>
                }>
                <div className="py-4">
                  <p>This is a {modalSize} modal dialog example.</p>
                  <p className="mt-2">Modals are useful for focused interactions that require the user's attention.</p>
                </div>
              </Modal>
            </div>
          </section>

          {/* Added Tabs Component Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Tabs Component</h2>

            <div className="grid gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Basic Tabs</h3>
                <Tabs
                  items={[
                    { id: "tab1", label: <div className="px-2 inline-block">Tab 1</div>, content: <p className="p-4 bg-gray-50 rounded">Content for Tab 1</p> },
                    { id: "tab2", label: <div className="px-2 inline-block">Tab 2</div>, content: <p className="p-4 bg-gray-50 rounded">Content for Tab 2</p> },
                    { id: "tab3", label: <div className="px-2 inline-block">Tab 3</div>, content: <p className="p-4 bg-gray-50 rounded">Content for Tab 3</p> },
                  ]}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Variant Styles</h3>
                <div className="grid gap-4">
                  <Tabs
                    variantStyle="line"
                    items={[
                      { id: "line1", label: <div className="p-2">Line Style</div>, content: <p className="p-4 bg-gray-50 rounded">Line variant tabs use an underline indicator</p> },
                      { id: "line2", label: <div className="p-2">Tab 2</div>, content: <p className="p-4 bg-gray-50 rounded">Another tab content</p> },
                    ]}
                  />

                  <Tabs
                    variantStyle="enclosed"
                    items={[
                      { id: "enclosed1", label: <div className="p-2">Enclosed Style</div>, content: <p className="p-4 bg-gray-50 rounded">Enclosed variant tabs look like folder tabs</p> },
                      { id: "enclosed2", label: <div className="p-2">Tab 2</div>, content: <p className="p-4 bg-gray-50 rounded">Another tab content</p> },
                    ]}
                  />

                  <Tabs
                    variantStyle="soft-rounded"
                    items={[
                      { id: "soft1", label: <div className="p-2">Soft Rounded</div>, content: <p className="">Soft rounded tabs have gentle rounded corners</p> },
                      { id: "soft2", label: <div className="p-2">Tab 2</div>, content: <p className="">Another tab content</p> },
                    ]}
                  />

                  <Tabs
                    variantStyle="pill"
                    items={[
                      { id: "pill1", label: <div className="p-2 px-4">Pill Style</div>, content: <p className="p-4 bg-gray-50 rounded">Pill tabs have fully rounded corners</p> },
                      { id: "pill2", label: <div className="p-2 px-4">Tab 2</div>, content: <p className="p-4 bg-gray-50 rounded">Another tab content</p> },
                    ]}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Vertical Tabs</h3>
                <Tabs
                  className="bg-gray-100"
                  orientation="vertical"
                  items={[
                    { id: "v1", label: <div className="p-2 min-w-32 text-left px-4">Tab 1</div>, content: <p className="p-4 bg-gray-50 rounded">Content for vertical tab 1</p> },
                    { id: "v2", label: <div className="p-2 min-w-32 text-left px-4">Tab 2</div>, content: <p className="p-4 bg-gray-50 rounded">Content for vertical tab 2</p> },
                    { id: "v3", label: <div className="p-2 min-w-32 text-left px-4">Tab 3</div>, content: <p className="p-4 bg-gray-50 rounded">Content for vertical tab 3</p> },
                  ]}
                />
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">With Icons</h3>
                <Tabs
                  items={[
                    {
                      id: "icon1",
                      label: <span className="p-2 pr-4">Profile</span>,
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle
                            cx="12"
                            cy="7"
                            r="4"></circle>
                        </svg>
                      ),
                      content: <p className="p-4 bg-gray-50 rounded">User profile content</p>,
                    },
                    {
                      id: "icon2",
                      label:<span className="p-2 pr-4">Settings</span>,
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round">
                          <circle
                            cx="12"
                            cy="12"
                            r="3"></circle>
                          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                        </svg>
                      ),
                      content: <p className="p-4 bg-gray-50 rounded">Settings content</p>,
                    },
                  ]}
                />
              </div>
            </div>
          </section>
          <div>
            <TableExample />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
