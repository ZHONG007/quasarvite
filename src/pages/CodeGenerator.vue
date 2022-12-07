<template>
  <q-layout>
    <q-page-container>
      <q-page class="">
        <q-card>
          <div>
            <h6>many to many relationship</h6>
            <div>
              Class/Table Name:<input v-model="mainTable" />
              <button @click="addItem">Add Column</button>
              <button @click="generateJava()">Generate code</button>
              <button @click="apiRequest">Api Request</button>
              has:<input v-model="subTable" />
            </div>

            <div v-for="item in cols" :key="item.columnName" class="row">
              <input v-model="item.columnName" label="name" class="col-1" />
              <select v-model="item.typeofCode" class="col-1">
                <option>Integer</option>
                <option>String</option>
                <option>Boolean</option>
              </select>
              <input
                v-model="item.definition"
                label="definition"
                class="col-6"
              />
            </div>
          </div>
          <h6>data Entity</h6>
          <p v-html="entityCode"></p>
          <h6>data repository</h6>
          <p v-html="repositoryCode"></p>
          <h6>data controller</h6>
          <p v-html="controllerCode"></p>
          <h6>ts data class</h6>
          <p v-html="voTs"></p>
          <p v-html="resTs"></p>

          <h6>many to many</h6>
          <div> {{ mainCode }}</div>
          <h6>sub</h6>
          {{ subCode }}
        </q-card>

        <!-- <p v-html="mainCode"></p> -->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { shallowReactive, shallowRef } from "vue";
import { useQuasar } from "quasar";
import {
  generateCol,
  generateData,
  generateVoTs,
} from "src/class/code/generator";
import { api } from "boot/axios";
const mainTable = shallowRef("Main");
const subTable = shallowRef("Sub");
const entityCode = shallowRef("");
const mainCode = shallowRef("");
const controllerCode = shallowRef("");
const repositoryCode = shallowRef("");
const subCode = shallowRef("");
const voTs = shallowRef("");
const resTs = shallowRef("");
const cols = shallowReactive([
  {
    columnName: "Email",
    definition: "varchar(127) integer UNIQUE NOT NULL",
    typeofCode: "String",
  },
]);
//CapTableMain.value = tableMain.value[0].toLocaleUpperCase;
function addItem() {
  cols.push({
    columnName: "User",
    definition: "varchar(127) integer UNIQUE NOT NULL",
    typeofCode: "String",
  });
}

function apiRequest() {
  const result = api.get("/todos/1").then((response) => {
    console.log(response.data, response.status);
  });
}
function generateJava() {
  // const cols = [
  //   {
  //     columnName: "string",
  //     definition: "string",
  //     typeofCode: "string",
  //   },
  //   {
  //     columnName: "string1",
  //     definition: "string1",
  //     typeofCode: "int",
  //   },
  // ];
  change(mainTable.value, subTable.value);
  const result = generateData(mainTable.value, cols);
  const vo = generateVoTs(mainTable.value, cols);
  entityCode.value = result.dataModel;
  controllerCode.value = result.controller;
  voTs.value = vo.vo;
  resTs.value = vo.res;
  repositoryCode.value = result.repository;
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
