import { api } from 'boot/axios'
const main = 'Main';
const _tableName = 'main';

const className = "Video";
const tableName = "video";
const tableStructure = [
  {
    columnName: "id",
    type: "int",
  },
];

const stringAController = `@RestController
@RequestMapping("/api")
public class ${main}Controller {

    @Autowired
    private ${main}Repository ${_tableName}Repository;

    @GetMapping("/${_tableName}s")
    public Object getAll${main}s(@RequestParam(required = false) String title) {
        List<${main}> ${_tableName}s = new ArrayList<${main}>();

        if (title == null)
            ${_tableName}Repository.findAll().forEach(${_tableName}s::add);
        else
            ${_tableName}Repository.findByTitleContaining(title).forEach(${_tableName}s::add);

        if (${_tableName}s.isEmpty()) {
            return Result.fail("No ${_tableName}s found");
        }

        return Result.ok(${_tableName}s);
    }

    @GetMapping("/${_tableName}s/{id}")
    public Object get${main}ById(@PathVariable("id") Integer id) {
        ${main} ${_tableName} = ${_tableName}Repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found ${_tableName} with id = " + id));

        return Result.ok(${_tableName});
    }

    @PostMapping("/${_tableName}s")
    public Object create${main}() {
      ${main} _${_tableName} = ${_tableName}Repository.save(new ${main}());
      return Result.ok(_${_tableName});
    }

    @PutMapping("/${_tableName}s/{id}")
    public Object update${main}(@PathVariable("id") Integer id, @RequestBody ${main} ${_tableName}) {
      ${main} _${_tableName} = ${_tableName}Repository.findById(id)
          .orElseThrow(() -> new ResourceNotFoundException("Not found ${_tableName} with id = " + id));
      _${_tableName}.setTitle(${_tableName}.getTitle());
      return Result.ok(_${_tableName});
    }

    @DeleteMapping("/${_tableName}s/{id}")
    public Object delete${main}(@PathVariable("id") Integer id) {
      ${_tableName}Repository.deleteById(id);
      return Result.ok();
    }

    @DeleteMapping("/${_tableName}s")
    public Object deleteAll${main}s() {
      ${_tableName}Repository.deleteAll();
      return Result.ok();
    }
}`;

const stringTs = `export class VideoInput {
  public id: number | null = null;
  public name: string = "";
  public description: string = "";
  public coverUrl: string = "";

  public result: Video[] = [];
  public async apiRequest(): Promise<Video[]> {
    const response = await fetch(
      "http://localhost:8080/api/videos"
    );
    const data = await response.json();
    return data.code;
  }
}

export class Video {
  public id: number | null = null;
  public name: string = "";
  public description: string = "";
  public coverUrl: string = "";
}`

function apiRequest() {
  const resuult = api.get("/api/main/request");
  console.log(resuult);
}

//const tableName = 'user';
const colName = "id";
const colDefinition = "varchar(255)/integer NOT NULL UNIQUE DEFAULT";
const setGetString = `public Integer getUserId() {
  return userId;
}
public void setUserId(Integer userId) {
  this.userId = userId;
}`

interface colStruct {
  columnName: string,
  definition: string,
  typeofCode: string,
};

export function generateCol(col: colStruct[]) {
  let result = "";
  col.forEach((el) => {
    const columnNameLower = lowerCase(el.columnName);
    const _columnName = toLine(columnNameLower);
    result += `@Column(name = "${_columnName}", columnDefinition = "${el.definition}")`;
    result += `public ${el.typeofCode} get${el.columnName}() { return ${columnNameLower};}`;
    result += `public ${el.typeofCode} set${el.columnName}() { this.${columnNameLower}=${columnNameLower} ;} <br>`
  })
  return result;
}

function generateVo(col: colStruct[]) {
  const stringA = `public class ${tableName}Vo implements Serializable {
    private static final long serialVersionUID = 1L;<br>`
  const _result = generateCol(col);
  return stringA + _result + `}`;
}

export function generateVoTs(tableName: string, col: colStruct[]) {

  let result = "";
  col.forEach((el) => {
    const columnNameLower = lowerCase(el.columnName);
    const _columnName = toLine(columnNameLower);
    const typeData = switchType(el.typeofCode);
    result += `public ${columnNameLower}: ${typeData}|null = null <br>`;
  })
  const stringA = `export class ${tableName}Vo { public id:  number | null = null;<br>`;
  const stringB = `export class ${tableName} {
    public id:  number | null = null;<br>
    public createdAt: string|null = null;<br>
    public updatedAt: string|null = null;<br>
    `;
  //const _result = generateCol(col);
  const _res = {
    vo:
      stringA +
      result +
      `
    public apiRequest() {
      const result = api.get("/api/${tableName}s");<br>
      const results = api.get("/api/${tableName}s",{params: {id:this.id}});<br>
      const resultCreate = api.post("/api/${tableName}s",  {data: {
        firstName: 'Fred',
        lastName: 'Flintstone'}});<br>
      const resultUpdate = api.put("/api/${tableName}s/{id}");<br>
      const resultDelete = api.delete("/api/${tableName}s/{id}");<br>
      const resultAllDelete = api.delete("/api/${tableName}s/{id}");<br>
    }};`,
    res: stringB + result + `}`,
  };
  return _res;

}

const stringApiR = `
    api.getById, api.getAll, api.create, api.updateById, api.deleteById, api.deleteAll
`;

function switchType(type: string) {
  switch (type) {
    case "String":
      return "string";
    case "Integer":
      return "number";
    case "Boolean":
      return "boolean";
    default:
      return "String";
  }
}

export function generateData(tableName: string, col: colStruct[]) {
  const tableNameLower = lowerCase(tableName);
  const _tableName = toLine(tableNameLower);
  const stringA = `import java.io.Serializable;
  import java.util.Date;
  import java.util.HashSet;
  import java.util.Set;
  import org.hibernate.annotations.CreationTimestamp;
  import org.hibernate.annotations.UpdateTimestamp;
  import jakarta.persistence.*;//<br>
  @Entity //<br>
  @Table(name = "${_tableName}")
  public class ${tableName} implements Serializable {
    private static final long serialVersionUID = 1L;<br>

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "SERIAL")
    private long id;// ----------

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Column(name = "created_at", columnDefinition = "TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP", updatable = false, insertable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;// =======

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    @Column(name = "updated_at", columnDefinition = "TIMESTAMPTZ DEFAULT NOW()", updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
  `
  const _result = generateCol(col);



  const stringAController = `import java.util.ArrayList;
  import java.util.List;
  import java.util.Optional;

  import org.springframework.beans.factory.annotation.Autowired;
  import org.springframework.web.bind.annotation.CrossOrigin;
  import org.springframework.web.bind.annotation.GetMapping;
  import org.springframework.web.bind.annotation.PathVariable;
  import org.springframework.web.bind.annotation.PostMapping;
  import org.springframework.web.bind.annotation.RequestBody;
  import org.springframework.web.bind.annotation.RequestMapping;
  import org.springframework.web.bind.annotation.RestController;@RestController
@RequestMapping("/api")
public class ${tableName}Controller {

    @Autowired
    private ${tableName}Repository ${_tableName}Repository;

    @GetMapping("/${_tableName}s")
    public Object getAll${tableName}s(@RequestParam(required = false) String title) {
        List<${tableName}> ${_tableName}s = new ArrayList<${tableName}>();

        if (title == null)
            ${_tableName}Repository.findAll().forEach(${_tableName}s::add);
        else
            ${_tableName}Repository.findByTitleContaining(title).forEach(${_tableName}s::add);

        if (${_tableName}s.isEmpty()) {
            return Result.fail("No ${_tableName}s found");
        }

        return Result.ok(${_tableName}s);
    }

    @GetMapping("/${_tableName}s/{id}")
    public Object get${tableName}ById(@PathVariable("id") Integer id) {
        ${tableName} ${_tableName} = ${_tableName}Repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found ${_tableName} with id = " + id));

        return Result.ok(${_tableName});
    }

    @PostMapping("/${_tableName}s")
    public Object create${tableName}() {
      ${tableName} _${_tableName} = ${_tableName}Repository.save(new ${tableName}());
      return Result.ok(_${_tableName});
    }

    @PutMapping("/${_tableName}s/{id}")
    public Object update${tableName}(@PathVariable("id") Integer id, @RequestBody ${tableName} ${_tableName}) {
      ${tableName} _${_tableName} = ${_tableName}Repository.findById(id)
          .orElseThrow(() -> new ResourceNotFoundException("Not found ${_tableName} with id = " + id));
      _${_tableName}.setTitle(${_tableName}.getTitle());
      return Result.ok(_${_tableName});
    }

    @DeleteMapping("/${_tableName}s/{id}")
    public Object delete${tableName}(@PathVariable("id") Integer id) {
      ${_tableName}Repository.deleteById(id);
      return Result.ok();
    }

    @DeleteMapping("/${_tableName}s")
    public Object deleteAll${tableName}s() {
      ${_tableName}Repository.deleteAll();
      return Result.ok();
    }
}`;

  const stringRepository = `import org.springframework.data.jpa.repository.JpaRepository;
  import org.springframework.stereotype.Repository;
  @Repository
  public interface ${tableName}Repository extends JpaRepository &lt ${tableName},Integer &gt {
  }`


  const res = {
    dataModel: stringA + _result + `}`,
    controller: stringAController,
    repository: stringRepository,
  };

  return res;

}

function toLine(name: string) {
  return name.replace(/([A-Z])/g, "_$1").toLowerCase();
}
function lowerCase(str: string) {
  const newStr = str.slice(0, 1).toLowerCase() + str.slice(1);
  return newStr;
}

