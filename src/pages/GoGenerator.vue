<template>
  <q-layout>
    <q-page-container>
      <q-page class="">
        <div>
          <q-list bordered>
            <q-separator />

            <q-expansion-item
              group="somegroup"
              icon="perm_identity"
              label="Second"
              header-class="text-teal"
            >
              <q-card>
                <div>
                  <h6>many to many relationship</h6>
                  <div>
                    Class/Table Name:<input v-model="mainTable" />
                    <button @click="addItem">Add Column</button>
                    <button @click="generateJava">Generate code</button>
                    <button @click="apiRequest">Api Request</button>
                    has:<input v-model="subTable" />
                  </div>
                  <div class="row">
                    <div class="col-1">name</div>
                    <div class="col-1">Data type</div>
                    <div class="col-1">size of String</div>
                    <div class="col-1">Null</div>
                    <div class="col-1">Unique</div>
                  </div>

                  <div v-for="(item, index) in cols" :key="index" class="row">
                    <input v-model="item.name" label="name" class="col-1" />
                    <select v-model="item.typeofData" class="col-1">
                      <option>Integer</option>
                      <option>String</option>
                      <option>Boolean</option>
                    </select>
                    <input v-model="item.sizeofString" class="col-1" />
                    <select v-model="item.nullable" class="col-1">
                      <option>true</option>
                      <option>false</option>
                    </select>
                    <select v-model="item.unique" class="col-1">
                      <option>true</option>
                      <option>false</option>
                    </select>
                    <input
                      v-model="item.definition"
                      label="definition"
                      class="col-6"
                    />
                  </div>
                </div>
                <p v-html="goCode"></p>
                <p v-html="goController"></p>
                {{ goCode }}
                <h6>data Entity</h6>
                <p v-html="mainCode"></p>
              </q-card>
            </q-expansion-item>

            <q-separator />
            <q-expansion-item
              group="somegroup"
              icon="explore"
              label="First"
              default-opened
              header-class="text-primary"
            >
              <q-card>
                <q-card-section>
                  <input type="text" />
                  <input v-model="_bookVo.id" label="Author" class="col-1" />
                  <input v-model="_bookVo.id" label="Id" class="col-1" />
                  <button @click="applyRequest">api request</button>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>

        <!-- <p v-html="mainCode"></p> -->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { reactive, shallowReactive, shallowRef } from "vue";
import {
  QCard,
  QCardSection,
  QExpansionItem,
  QLayout,
  QList,
  QPage,
  QPageContainer,
  QSeparator,
  useQuasar,
} from "quasar";
import {
  generateColGo,
  colStructe,
  generateController,
  generateColJava,
generateJavaData,
generateVoTs,
} from "src/class/code/golang";
import { BookVo, Book } from "src/class/VideoInput";
import { api } from "boot/axios";
import { generateData } from "src/class/code/generator";
const mainTable = shallowRef("Main");
const goCode = shallowRef("Main");
const goController = shallowRef("");
const _bookVo = shallowReactive(new BookVo());
const subTable = shallowRef("Sub");
const entityCode = shallowRef("");
const mainCode = shallowRef("");
const controllerCode = shallowRef("");
const repositoryCode = shallowRef("");
const subCode = shallowRef("");
const voTs = shallowRef("");
const resTs = shallowRef("");
const cols: colStructe[] = shallowReactive([
  {
    name: "Email",
    definition: "",
    typeofData: "String",
    sizeofString: 127,
    nullable: "true",
    unique: "false",
  },
]);
//CapTableMain.value = tableMain.value[0].toLocaleUpperCase;
function addItem() {
  cols.push({
    name: "User",
    definition: "",
    typeofData: "String",
    sizeofString: 127,
    nullable: "true",
    unique: "false",
  });
}

async function applyRequest() {
  const result = await _bookVo.apiRequest("getAll");
  console.log(result.data.data);
  // if (result.status = '200'){
  //  console.log(result.data.data)
  // }
}

function apiRequest() {
  const result = api.get("/todos/1").then((response) => {
    console.log(response.data, response.status);
  });
}
function generateJava() {
  console.log("hehe");
  goCode.value = generateColGo(mainTable.value, cols);
  goController.value = generateController(mainTable.value);
  generateColJava(cols);
  const code = generateJavaData(mainTable.value,cols);
  const code2 = code.controller+code.dataModel+code.repository;
  const vcode = generateVoTs(mainTable.value, cols);
  mainCode.value = vcode+code2+code2;
}

function toLine(name: string) {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase();
}
function lowerCase(str: string) {
  const newStr = str.slice(0, 1).toLowerCase() + str.slice(1);
  return newStr;
}

function obtainCode() {
  change(mainTable.value, subTable.value);
}

function change(main: String, sub: String) {
  //  main = "Main";
  // sub = "SubTag";

  const mainLower = lowerCase(main);
  const subLower = lowerCase(sub);
  const _main = toLine(mainLower);
  const _sub = toLine(subLower);
  console.log(_main + "---" + _sub + "----" + mainLower + "----" + subLower);

  const stringA =
    "@ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE })";
  const stringB = `@JoinTable(name = "${_main}_${_sub}s",
    joinColumns = { @JoinColumn(name = "${_main}_id") },
    inverseJoinColumns = { @JoinColumn(name = "${_main}_id") })`;
  const stringC = `private Set<${sub}> ${subLower}s = new HashSet<>();
public Set<${sub}> get${sub}s() {
    return ${subLower}s;
}

public void set${sub}s(Set<${sub}> ${subLower}s) {
    this.${subLower}s = ${subLower}s;
}

public void add${sub}(${sub} ${subLower}) {
    this.${subLower}s.add(${subLower});
    ${subLower}.get${main}s().add(this);
}

public void removeTag(long ${subLower}Id) {
    ${sub} ${subLower} = this.${subLower}s.stream().filter(t -> t.getId() == ${subLower}Id).findFirst().orElse(null);
    if (${subLower} != null) {
        this.${subLower}s.remove(${subLower});
        ${subLower}.get${main}s().remove(this);
    }
}`;
  const finalString = stringA + stringB + stringC;
  // let str = finalString.replace('<','&lt').replace('>','&gt');
  // console.log(str);

  const subString = `@ManyToMany(fetch = FetchType.LAZY, cascade = {
      CascadeType.PERSIST,
      CascadeType.MERGE
  }, mappedBy = "${subLower}s")
  @JsonIgnore
  private Set<${main}> ${mainLower}s = new HashSet<>();  public Set<${main}> get${main}s() {
    return ${mainLower}s;
  }

  public void set${main}s(Set<${main}> ${mainLower}s) {
    this.${mainLower}s = ${mainLower}s;
  }`;

  mainCode.value = finalString;
  subCode.value = subString;
}
</script>

<style lang="scss" scoped>
#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
.normal_gradient {
  background: linear-gradient(145deg, rgb(74, 94, 137) 15%, #195ab6 70%);
}
.dark_gradient {
  background: linear-gradient(145deg, rgb(11, 26, 61) 15%, #103c4c 70%);
}
.login-form {
  position: absolute;
}
</style>
