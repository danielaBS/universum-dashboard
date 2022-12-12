import { useState } from "react";
import React from "react";
import "./App.css";
import "./color.css";
import "./components/typographic/typographic.css";
import ImageTop from "./components/imageTop/imageTop";
import ImageCaption from "./components/imageCaption/imageCaption";
import SizeModifier from "./components/sizeModifier/sizeModifier";
import Blocks from "./components/blocks/blocks";
import DropDown from "./components/dropDown/dropDown";
import Search from "./components/search/search";
import Navbar from "./components/navbar/navbar";
import DropDownMenu from "./components/dropDownMenu/dropDownMenu";
import Banner from "./components/banner/banner";
import DifferentLayoutBanner from "./components/differentLayoutBanner/differentLayoutBanner";
import Linear from "./components/progressIndicator/linear";
import Circular from "./components/progressIndicator/circular";
import InputFieldBanner from "./components/inputFieldBanner/inputFieldBanner";
import Services1 from "./components/organism/services1/services1";
import Services2 from "./components/organism/services2/services2";
import Services3 from "./components/organism/services3/services3";
import Services4 from "./components/organism/services4/services4";
import Header1 from "./components/organism/header1/header1";
import Header2 from "./components/organism/header2/header2";
import Header3 from "./components/organism/header3/header3";
import Footer1 from "./components/organism/footer1/footer1";
import Footer2 from "./components/organism/footer2/footer2";
import Input from "./components/input/input";
import StepList from "./components/Mobile/StepList";
import ProfileMenu from "./components/Mobile/ProfileMenu";
import SearchBar from "./components/SearchBarV2";
import CloseButton from "./components/CloseButton";
import Reports from "./components/Mobile/Reports";
// import Filter from "./components/Mobile/Filter";
import ButtonCommon from "./components/buttonCommon/buttonCommon";
import SideBar from "./components/sideBar_v1/sideBar";
import DropDownV2 from "./components/dropDown_v2/dropDown_v2";
import Options from "./components/options/options";
import ToggleSwitch from "./components/toggleSwitch/toggleSwitch";
import Tooltip from "./components/tooltip/tooltip";
import FilterAlternative from "./components/Mobile/filterAlternative/filterAlternative";
import DropdownFilter from "./components/Mobile/dropdownFilter/dropdownFilter";
import OptionsFilter from "./components/Mobile/optionsFilter/optionsFilter";
import CheckList from "./components/checkList/checkList";
import Modal from "./components/modal/modal";
import Alert from "./components/alert/alert";
import Button from "./components/button";
import InputSST from "./components/inputSST";
import AlertSST from "./components/alertSST";
import Backdrop from "./components/backdrop";
import DropdownSearch from "./components/dropDownSearch/dropDownSearch";
import DropDownCheck from "./components/dropDownCheck/dropDownCheck";

const options = [
  {
    id: 1,
    name: "Option 1",
  },
  {
    id: 2,
    name: "Option 2",
  },
  {
    id: 3,
    name: "Option 3",
  },
  {
    id: 4,
    name: "Option 4",
  },
];

function App() {
  const [searchBarValue, setSearchBarValue] = useState("");
  const [filterOptionsResult, setFilterOptionsResult] = useState();
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [inFocus, setInFocus] = React.useState(false);
  const [inFocus2, setInFocus2] = React.useState(false);
  const [inFocus3, setInFocus3] = React.useState(true);
  const [inFocusSearch, setInFocusSearch] = React.useState(false);

  const [value2, setValue2] = React.useState({ id: 0, name: "Text Here 2" });
  const [actionNav, setActionNav] = useState(false);
  const [category, setCategory] = React.useState("");

  const [selected, setSelected] = React.useState(0);

  const [placeHolderSearch, setPlaceHolderSearch] = React.useState("Buscar");
  const [searchField, setSearchField] = React.useState([
    {
      id: 1,
      name: "Candelaria texto de verda bien largo",
    },
    {
      id: 2,
      name: "Alfonso lopez de la santisima trinidad maría",
    },
    {
      id: 3,
      name: "Cerrito de los valles grandes de su señor",
    },
  ]);
  const [idVariable, setIdVariable] = useState(null);
  console.log("print id inside", idVariable);
  const testText = [
    {
      id: 3,
      name: "texto de prueba",
    },
    {
      id: 10,
      name: "texto de prueba 2",
    },
    {
      id: 25,
      name: "texto extra 3",
    },
  ];
  // const [categorySearch, setCategorySearch] = React.useState();
  const [inputSearch, setInputSearch] = React.useState("");
  const [valueSearch, setValueSearch] = React.useState();

  const [checkedState, setCheckedState] = useState(
    new Array(options.length).fill(false)
  );

  const filteredFilters = searchField.filter((data) => {
    return data.name.toLowerCase().includes(inputSearch.toLowerCase());
  });

  const handleChange = (e) => {
    setInputSearch(e);
  };

  const [value, setValue] = React.useState({ id: 0, name: "Text Here 1" });
  const valueSelected = (value) => console.log(value);

  const [openModal, setOpenModal] = React.useState(false);
  const closeModal = () => setOpenModal(false);

  return (
    <div className="app">
      <SideBar actionNav={actionNav} setActionNav={setActionNav}>
        <h4>Here goes any kind of content</h4>
        <ImageTop></ImageTop>
        <ImageTop></ImageTop>
        <ImageTop></ImageTop>
        <ImageTop></ImageTop>
      </SideBar>

      <header className="app-header">
        <h1>StoryBook Presentation</h1>
        <h1>Button SST</h1>
        <Button />
        <h1>Input SST</h1>
        <InputSST />
        <h1>Alert SST</h1>
        <AlertSST error />
        <h1>Backdrop</h1>
        {/* <Backdrop /> */}
        <h1>Alert</h1>
        <Alert />
        <Modal isOpen={openModal} isClose={closeModal} backdrop={"static"}>
          <h1>Test Modal</h1>
          <button style={{ width: "8rem" }}>GSSS</button>
        </Modal>
        <h3>Modal</h3>
        <ButtonCommon
          width="10rem"
          height="3rem"
          text="Abrir Modal"
          passedFunction={() => setOpenModal(true)}
          disabled={false}
        />
        <h3>CheckList</h3>
        <CheckList
          // checkColor={"red"}
          defItems={testText}
          idVariable={idVariable}
          setIdVariable={setIdVariable}
          selected={selected}
          setSelected={setSelected}
          fontSize={"18px"}
        />
        <h3>Toggle Switch</h3>
        <ToggleSwitch></ToggleSwitch>
        <h3>Image Top</h3>
        <ImageTop width="30%" />
        <h3>Tooltip on ImageTop</h3>
        <Tooltip
          content={"ImageTop, or pass props.content here"}
          direction="bottom"
        >
          <ImageTop></ImageTop>
        </Tooltip>

        <h3>Image Caption</h3>
        <ImageCaption width="20%" />
        <h3>Size modifiers</h3>
        <SizeModifier width="60%" />
        <h3>Blocks</h3>
        <Blocks />
        <h3>Drop Down</h3>
        <DropDown />
        <h3>Drop down menu</h3>
        <DropDownMenu />
        <h3>Search</h3>
        <div className="search__container">
          <Search
            inputFontSize="0.8rem"
            leftIcon
            onBlur={() => setInFocusSearch(false)}
            onChange={handleChange}
            onFocus={() => setInFocusSearch(true)}
            placeholder="Search"
          />
          {inFocusSearch && (
            <Options
              setValue={setValueSearch}
              setInFocus={setInFocusSearch}
              inFocus={inFocusSearch}
              options={filteredFilters}
            />
          )}
        </div>
        <h3>Navbar</h3>
        <Navbar></Navbar>
        <h3>Progress Indicators</h3>
        <Linear colorPrimary="#13007C" colorSecondary="#9EBAC6"></Linear>
        <br></br>
        <Linear colorPrimary="#32779D" colorSecondary="#BAD7E2"></Linear>
        <br></br>
        <Circular color="#13007C"></Circular>
        <Circular color="#32779D"></Circular>
        <h3>Input</h3>
        <Input isLabel={false} />
        <h3>Button Common</h3>
        <ButtonCommon />
        <h3>Drop Down V2</h3>
        <div className="dropDownV2__container">
          <DropDownV2
            valueSelected={valueSelected}
            width="15rem"
            dropdownGap={1}
            // showOptions={showOptions}
            // onFocus={(value) => showOptionsDropdown(value)}
            // onBlur={(value) => showOptionsDropdown(value)}
          />
          {/* {inFocus && (
            <Options
              setValue={setValue}
              setInFocus={setInFocus}
              inFocus={inFocus}
            />
          )} */}
        </div>

        <h3>Drop Down Search</h3>
        <div className="dropDownV2__container">
          <DropdownSearch
            minWidth="100%"
            initialValue={{
              value: { id: 0, name: "Departamento" },
              id: "Departamento",
            }}
            width="12rem"
            keepOpen={true}
            valueSelected={(e) => console.log("test: ", e.value)}
          />
        </div>
        <h3>Drop Down Checks</h3>
        <div className="dropDownV2__container">
          <DropDownCheck
            minWidth="100%"
            initialValue={checkedState.filter((data) => data === true)}
            keepOpen={false}
            valueSelected={(e) => {}}
            options={options.map((data) => ({
              id: data.id - 1,
              name: data.name,
            }))}
            checkedState={checkedState}
            setCheckedState={setCheckedState}
          />
        </div>
        <h3>Banners</h3>
        <Banner />
        <h3>Different Layout Banner</h3>
        <DifferentLayoutBanner />
        <h3>Input banner</h3>
        <InputFieldBanner />
        <h3>Organism</h3>
        <h3>Services 1</h3>
        <Services1 />
        <h3>Services 2</h3>
        <Services2 />
        <h3>Services 3</h3>
        <Services3 />
        <h3>Services 4</h3>
        <Services4 />
        <h3>Footer 1</h3>
        <Footer1 />
        <h3>Footer 2</h3>
        <Footer2 />
        <h3>Header 1</h3>
        <Header1 />
        <h3>Header 2</h3>
        <Header2 />
        <h3>Header 3</h3>
        {/* <Header3 /> */}
        <h3>Header 4</h3>
        <h3>*Mobile* </h3>
        <StepList title="¿Problemas para iniciar sesión?">
          <p>
            Si presenta problema para recordar su contraseña e ingresar al
            sistema de información de Valle mágico.
          </p>
          <p>
            <strong>1. Por favor, enviar un email a:</strong>
            <span>vallemagico.soporte@gmail.com</span>
          </p>
          <p>
            <strong>2. con el asunto:</strong>
            <span>“Olvidé mi contraseña”</span>
          </p>
          <div>
            <p>
              <strong>3. Con la siguiente información:</strong>
            </p>
            <p>* Nombre completo</p>
            <p>* Nombre de usuario</p>
            <p>* Última contraseña que recuerde</p>
          </div>
          <img src="/images/icons/chart.png" alt="" />
        </StepList>
        <h3>*Mobile* Profile Menu</h3>
        <div style={{ width: "500px", marginLeft: "200px" }}>
          <ProfileMenu />
        </div>
        <h3>*Mobile* Search Bar</h3>
        <SearchBar
        // inputPlaceHolder="Buscar..."
        // inputValue={searchBarValue}
        // setVariable={setSearchBarValue}
        // imagePath="/images/icons/icon_search.png"
        // imageAlt="Buscar input"
        // backgroundColor="red"
        // textColor="black"
        />
        {searchBarValue}
        <h3>*Mobile* Close Button</h3>
        <CloseButton
          buttonFunction={() => alert("This button Works")}
          imagePath="/images/icons/close_button.png"
        />
        {/* <h3>*Mobile* Filters</h3>
        <div style={{ width: "500px", marginLeft: "200px" }}>
          <Filter
            title="Filtros"
            imagePath="/images/icons/down_arrow.png"
            imageAlt="Open menu"
            filtersList={[
              {
                optionTitle: "This is my first",
                opFunction: () => handleOptionResults(1),
              },
              {
                optionTitle: "This is my second",
                opFunction: () => handleOptionResults(2),
              },
              {
                optionTitle: "This is my third",
                opFunction: () => handleOptionResults(3),
              },
              {
                optionTitle: "This is my fourth",
                opFunction: () => handleOptionResults(4),
              },
            ]}
            optionResults={{
              setFilterOptionsResult: setFilterOptionsResult,
              filterOptionsResult: filterOptionsResult,
              setSelectedFilters: setSelectedFilters,
              selectedFilters: selectedFilters,
            }}
          />
        </div> */}
        <p>
          {selectedFilters.map((item, index) => (
            <span>{item.filter}, </span>
          ))}
        </p>
        <h3>*Mobile* Filter Alternative</h3>
        <div style={{ width: "500px", marginLeft: "200px" }}>
          <FilterAlternative
            category={category}
            value={value}
            setValue={setValue}
            inFocusSearch={inFocusSearch}
            handleChange={handleChange}
            setInFocusSearch={setInFocusSearch}
            placeHolderSearch={placeHolderSearch}
            searchField={searchField}
            passedFunction={() => console.log("Funciona!!")}
          >
            <DropdownFilter
              value={value}
              setValue={setValue}
              inFocus={inFocus}
              setInFocus={setInFocus}
              category={"category 1"}
              setCategory={setCategory}
              setPlaceHolderSearch={setPlaceHolderSearch}
            />
            <DropdownFilter
              value={value2}
              setValue={setValue2}
              inFocus={inFocus2}
              setInFocus={setInFocus2}
              category={"category 2"}
              setCategory={setCategory}
              setPlaceHolderSearch={setPlaceHolderSearch}
            />
            {inFocus && (
              <OptionsFilter
                setValue={setValue}
                setInFocus={setInFocus}
                inFocus={inFocus}
                category={"category 1"}
              />
            )}
            {inFocus2 && (
              <OptionsFilter
                setValue={setValue2}
                setInFocus={setInFocus2}
                inFocus={inFocus2}
                category={"category 2"}
              />
            )}
            {inFocusSearch && (
              <OptionsFilter
                setValue={setValueSearch}
                setInFocus={setInFocusSearch}
                inFocus={inFocusSearch}
                category={category}
                optionResults={filteredFilters}
              />
            )}
          </FilterAlternative>
        </div>
        <h3>*Mobile* Reports</h3>
        <Reports
          title="Resultados Por Asignatura"
          imagePath="/images/icons/down_arrow.png"
          imageAlt="Open menu"
          summaryTitle="This is my summary:"
          summaryColor="red"
          summaryInfoList={[
            {
              type: "Total de juegos:",
              value: "119",
            },
            {
              type: "Promedio de juegos jugados:",
              value: "119",
            },
            {
              type: "Total de municipios que jugaron:",
              value: "34 de 34",
            },
          ]}
          downloadButtonText="Descargar Informe"
          downloadButtonColor="white"
          downloadButtonBg="#092F24"
          downloadButtonFn={() => alert("Hello from download button!")}
          // closeMenu={true}
          keepClosed={false}
        >
          <img src="/images/icons/chart.png" alt="" />
        </Reports>
      </header>
    </div>
  );
}

export default App;
