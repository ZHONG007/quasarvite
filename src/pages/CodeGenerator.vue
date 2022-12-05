<template>
  <q-layout>
    <q-page-container>
      <q-page class="">
        <h5>many to many relationship</h5>
        <q-btn @click="obtainCode()">change</q-btn>
        <q-input v-model="mainTable" label="main table" />
        <q-input v-model="subTable" label="sub table" />

        <h5>{{ mainTable }} Code</h5>
        {{ mainCode }}
        <!-- <p v-html="mainCode"></p> -->
        <h5>{{ subTable }} Code</h5>
        {{ subCode }}
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { shallowRef } from "vue";
import { useQuasar } from "quasar";
const mainTable = shallowRef("Main");
const subTable = shallowRef("Sub");
const mainCode = shallowRef("");
const subCode = shallowRef("");
//CapTableMain.value = tableMain.value[0].toLocaleUpperCase;

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

  const subString = `  @ManyToMany(fetch = FetchType.LAZY, cascade = {
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
