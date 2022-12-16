export interface colStructe {
  name: string,
  definition: string,
  typeofData: string,
  sizeofString: number,
  nullable: string,
  unique: string
};



export function generateColGo(tableName: string, col: colStructe[]) {
  let resultGo = `type ${tableName} struct {<br>`;
  resultGo += `Id int &#8217; json:"id" gorm:"primaryKey;auto_increment" &#8217;<br> `;
  col.forEach((el) => {
    const nameLower = lowerCase(el.name);
    const _name = toLine(nameLower);
    let _typeofData = '';
    if (el.typeofData === 'Integer') {
      _typeofData = 'int';
    }
    const typeLower = lowerCase(el.typeofData);
    const varchar = (el.typeofData === 'String')
      ? `varchar(${el.sizeofString})`
      : ``;

    const nullable = (el.nullable === 'true') ? "" : "not null;";
    const unique = (el.unique === 'true') ? "unique;" : "";
    resultGo += `${el.name} ${typeLower} &lsquo;json:"${nameLower}"gorm: "type:${varchar};${nullable}${unique}"&lsquo; <br>`;
  })
  resultGo += `CreatedAt time.Time <br> UpdatedAt time.Time`
  return resultGo + '}';
}

export function generateController(tableName: string) {
  const lowTableName = lowerCase(tableName);
  console.log("controller");
  const stringA = `//----------------${tableName}------------------------<br>
  r.GET("${lowTableName}s",controller.GetAll${tableName}s)<br>
  r.GET("${lowTableName}s/:id",controller.Get${tableName}ById)<br>
  r.POST("${lowTableName}s",controller.Create${tableName})<br>
  r.PUT("${lowTableName}s/:id",controller.Update${tableName})<br>
  r.DELETE("${lowTableName}s/:id",controller.Delete${tableName}ById)<br>`;

  //controllers：
  const stringB = `
  //****************************controller********************<br>
  // @Summary hello world api <br>
  // @version 1.0 <br>
  // @Accept  json <br>
  // @Param data body Create${tableName}Input true "Create${tableName}Input data" <br>
  // @Router /createuser [post] <br>
  func Create${tableName}(ctx *gin.Context) { <br>
    var input ${lowTableName}Input; <br>
    if err := ctx.ShouldBindJSON(&input); err != nil { <br>
      ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()}); <br>
      return <br>
    };
    DB := common.GetDB(); <br>
    new${lowTableName} := model.${tableName}{
      Synopsis:   "name",
      Author: "123456",
    };<br>
    DB.Create(&new${lowTableName});<br>
    response.Success(ctx, new${lowTableName}, "登录成功")<br>
  }<br>

  // @Summary get all
  // @version 1.0
  // @Accept  json
  // @Router /${tableName}s [get] <br>
  func GetAll${tableName}s(ctx *gin.Context) {<br>
    var ${lowTableName}s []model.${tableName}<br>

    DB := common.GetDB();<br>
    if result := DB.Find(&${lowTableName}s).Error; result != nil{<br>
      response.Fail(ctx,"Failed", nil);<br>
    }<br>
    response.Success(ctx, ${lowTableName}s, "ok");<br>
  }<br>

  func Get${tableName}ById(ctx *gin.Context) {<br>
    id := ctx.Param("id");<br>
    DB := common.GetDB();<br>
    var ${lowTableName} model.${tableName};<br>
    _id, err := strconv.ParseInt(id, 10, 0);<br>

    if err != nil {<br>
      fmt.Println("Error during conversion");
      response.Fail(ctx, "Invalid paramters", nil);<br>
      return
    }<br>
    if DB.Find(&${lowTableName}, _id).RecordNotFound() {
      response.Fail(ctx, "not existed", nil)<br>
      return
    }<br>
    response.Success(ctx, ${lowTableName}, "new ${lowTableName}")<br>

  }<br>

  func Update${tableName}(ctx *gin.Context) {<br>
    DB := common.GetDB();<br>
    var ${lowTableName} = model.${tableName}{Id: 1};<br>
    DB.First(&${lowTableName});<br>
    ${lowTableName}.Author = "changed";<br>
    DB.Save(&${lowTableName});<br>
    response.Success(ctx, ${lowTableName}, "new ${lowTableName}")<br>

  }<br>

  func Delete${tableName}ById(ctx *gin.Context) {
    id := ctx.Param("id");<br>
    DB := common.GetDB();<br>
    _id, err := strconv.ParseInt(id, 10, 0);<br>
    if err != nil {<br>
      fmt.Println("Error during conversion");
      response.Fail(ctx, "Invalid paramters", nil);<br>
      return
    }<br>
    var ${lowTableName} = model.${tableName}{Id: int(_id)};<br>
    if result := DB.Delete(&${lowTableName}).Error; result != nil{<br>
      response.Fail(ctx,"Failed", nil);<br>
      return
    }<br>
    response.Success(ctx, nil, "ok")<br>


  }<br>`
  console.log(stringA);
  return stringA + stringB;
}

export function generateColJava(col: colStructe[]) {
  let result = "";
  col.forEach((el) => {
    const columnNameLower = lowerCase(el.name);
    const _columnName = toLine(columnNameLower);
    let varchar = (el.typeofData === 'String')
      ? `varchar(${el.sizeofString})`
      : ``;
    if (el.typeofData !== 'String') {
      varchar = el.typeofData;
    }

    const nullable = (el.nullable === 'true') ? "" : "NOT NUll";
    const unique = (el.unique === 'true') ? "Unique" : "";
    result += `@Column(name = "${_columnName}", columnDefinition = "${varchar} ${nullable} ${unique} ")<br>`;
    result += `private ${el.typeofData} ${columnNameLower};<br>`;
    result += `public ${el.typeofData} get${el.name}() { return ${columnNameLower};}<br>`;
    result += `public void set${el.name}(${el.typeofData} ${columnNameLower}) { this.${columnNameLower}=${columnNameLower} ;} <br>`
  })
  return result;
}

export function generateVoTs(tableName: string, col: colStructe[]) {

  let result = "";
  col.forEach((el) => {
    const columnNameLower = lowerCase(el.name);
    const _columnName = toLine(columnNameLower);
    const typeData = switchType(el.typeofData);
    result += `public ${columnNameLower}: ${typeData}|null = null <br>`;
  })
  const stringA = `export class ${tableName}Vo { public id:  number | null = null;<br>`;
  const stringB = `export class ${tableName} {
    public id:  number | null = null;<br>
    public createdAt: string|null = null;<br>
    public updatedAt: string|null = null;<br>
    `;
  const lowTableName = lowerCase(tableName);

  //const _result = generateCol(col);
  const _res = {
    vo:
      stringA +
      result +
      `
      public async apiRequest(method: string) {<br>
        const requestType = ['getAll', 'getById', 'create', 'update', 'deleteById'];
        switch (method) {
          case requestType[0]:
            return await api.get("/${lowTableName}s");<br>
          case requestType[1]:<br>
            return await api.get("/${lowTableName}s/" + '{' + this.id?.toString() + '}');<br>
          case requestType[2]:<br>
            return await api.post("/${lowTableName}s", this);<br>
          case requestType[3]:<br>
            return await api.put("/${lowTableName}s/" + '{' + this.id?.toString() + '}', this);<br>
          case requestType[4]:<br>
            return await api.delete("/${lowTableName}s/" + '{' + this.id?.toString() + '}');<br>
          default:<br>
            return await api.get("/${lowTableName}s");<br>
        }<br>
      }<br>

    };`,
    res: stringB + result + `}`,
  };
  return _res.vo;

}

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

export function generateJavaData(tableName: string, col: colStructe[]) {
  const tableNameLower = lowerCase(tableName);
  const _tableName = toLine(tableNameLower);
  const stringA = `import java.io.Serializable;
  import java.util.Date;<br>
  import java.util.HashSet;<br>
  import java.util.Set;<br>
  import org.hibernate.annotations.CreationTimestamp;<br>
  import org.hibernate.annotations.UpdateTimestamp;<br>
  import jakarta.persistence.*;//<br>
  @Entity //<br>
  @Table(name = "${_tableName}")
  public class ${tableName} implements Serializable {
    private static final long serialVersionUID = 1L;<br>

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", columnDefinition = "SERIAL")
    private long id;<br>

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    @Column(name = "created_at", columnDefinition = "TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP", updatable = false, insertable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;<br>

    public Date getCreatedAt() {
        return createdAt;
    }<br>

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }<br>

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
  const _result = generateColJava(col);



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
