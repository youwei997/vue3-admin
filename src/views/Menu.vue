<template>
    <div class="menu-manage">
        <div class="query-form">
            <el-form ref="form" :inline="true" :model="queryForm">
                <el-form-item label="菜单名称" prop="menuName">
                    <el-input v-model="queryForm.menuName" placeholder="请输入菜单名称"/>
                </el-form-item>
                <el-form-item label="菜单状态" prop="menuState">
                    <el-select v-model="queryForm.menuState">
                        <el-option :value="1" label="正常"></el-option>
                        <el-option :value="2" label="停用"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getMenuList">查询</el-button>
                    <el-button @click="handleReset('form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
            <div class="action">
                <el-button type="primary" @click="handleAdd(1)">新增</el-button>
            </div>
            <el-table
                    :data="menuList"
                    row-key="_id"
                    :tree-props="{ children: 'children' }"
            >
                <el-table-column
                        v-for="item in columns"
                        :key="item.prop"
                        :prop="item.prop"
                        :label="item.label"
                        :width="item.width"
                        :formatter="item.formatter"
                >
                </el-table-column>
                <el-table-column label="操作" width="220">
                    <template #default="scope">
                        <el-button
                                @click="handleAdd(2, scope.row)"
                                type="primary"
                                size="mini"
                        >新增
                        </el-button
                        >
                        <el-button @click="handleEdit(scope.row)" size="mini"
                        >编辑
                        </el-button
                        >
                        <el-button
                                type="danger"
                                size="mini"
                                @click="handleDel(scope.row._id)"
                        >删除
                        </el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="菜单操作" v-model="showModal">
            <el-form
                    ref="dialogForm"
                    :model="menuForm"
                    label-width="100px"
                    :rules="rules"
            >
                <el-form-item label="父级菜单" prop="parentId">
                    <el-cascader
                            placeholder="不选，则直接创建一级菜单"
                            v-model="menuForm.parentId"
                            :options="menuList"
                            :props="{ checkStrictly: true, value: '_id', label: 'menuName' }"
                            clearable
                    />
                </el-form-item>
                <el-form-item label="菜单类型" prop="menuType">
                    <el-radio-group v-model="menuForm.menuType">
                        <el-radio :label="1">菜单</el-radio>
                        <el-radio :label="2">按钮</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="菜单名称" prop="menuName">
                    <el-input v-model="menuForm.menuName" placeholder="请输入菜单名称"/>
                </el-form-item>
                <el-form-item
                        label="菜单图标"
                        prop="icon"
                        v-show="menuForm.menuType == 1"
                >
                    <el-input v-model="menuForm.icon" placeholder="请输入岗位"/>
                </el-form-item>
                <el-form-item
                        label="路由地址"
                        prop="path"
                        v-show="menuForm.menuType == 1"
                >
                    <el-input v-model="menuForm.path" placeholder="请输入路由地址"/>
                </el-form-item>
                <el-form-item
                        label="权限标识"
                        prop="menuCode"
                        v-show="menuForm.menuType == 2"
                >
                    <el-input v-model="menuForm.menuCode" placeholder="请输入权限标识"/>
                </el-form-item>
                <el-form-item
                        label="组件路径"
                        prop="component"
                        v-show="menuForm.menuType == 1"
                >
                    <el-input v-model="menuForm.component" placeholder="请输入组件路径"/>
                </el-form-item>
                <el-form-item
                        label="菜单状态"
                        prop="menuState"
                        v-show="menuForm.menuType == 1"
                >
                    <el-radio-group v-model="menuForm.menuState">
                        <el-radio :label="1">正常</el-radio>
                        <el-radio :label="2">停用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
            </template>
        </el-dialog>
    </div>
</template>
<!--<script>
import utils from "../utils/utils";
export default {
  name: "Menu",
  data() {
    return {
      queryForm: {
        menuState: 1,//菜单状态
        menuName:'', //菜单名称
      },
      menuList: [],
      columns: [
        {
          label: "菜单名称",
          prop: "menuName",
          width: 150,
        },
        {
          label: "图标",
          prop: "icon",
        },
        {
          label: "菜单类型",
          prop: "menuType",
          formatter(row, column, value) {
            return {
              1: "菜单",
              2: "按钮",
            }[value];
          },
        },
        {
          label: "权限标识",
          prop: "menuCode",
        },
        {
          label: "路由地址",
          prop: "path",
        },
        {
          label: "组件路径",
          prop: "component",
        },
        {
          label: "菜单状态",
          prop: "menuState",
          width: 90,
          formatter(row, column, value) {
            return {
              1: "正常",
              2: "停用",
            }[value];
          },
        },
        {
          label: "创建时间",
          prop: "createTime",
          formatter(row, column, value) {
            return utils.formatDate(new Date(value));
          },
        },
      ],
      showModal: false,
      menuForm: {
        parentId: [null],
        menuType: 1,
        menuState: 1,
      },
      action: "",
      rules: {
        menuName: [
          {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur",
          },
          {
            min: 2,
            max: 10,
            message: "长度在2-8个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    // 菜单列表初始化
    async getMenuList() {
      try {
        let list = await proxy.$api.getMenuList(this.queryForm);
        this.menuList = list;
      } catch (e) {
        throw new Error(e);
      }
    },
    // 表单重置
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    // 新增菜单
    handleAdd(type, row) {
      this.showModal = true;
      this.action = "add";
      if (type == 2) {
        this.menuForm.parentId = [...row.parentId, row._id].filter(
            (item) => item
        );
      }
    },
    handleEdit(row) {
      this.showModal = true;
      this.action = "edit";
      this.$nextTick(() => {
        Object.assign(this.menuForm, row);
      });
    },
    async handleDel(_id) {
      await proxy.$api.menuSubmit({ _id, action: "delete" });
      proxy.$message.success("删除成功");
      this.getMenuList();

    },
    // 菜单操作-提交
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { action, menuForm } = this;
          let params = { ...menuForm, action };
          let res = await proxy.$api.menuSubmit(params);
          this.showModal = false;
          proxy.$message.success("操作成功");
          this.handleReset("dialogForm");
          this.getMenuList();
        }
      });
    },
    // 弹框关闭
    handleClose() {
      this.showModal = false;
      this.handleReset("dialogForm");
    },
  },
};
</script>-->

<script setup>

import utils from "../utils/utils";
import {getCurrentInstance, onMounted, reactive, ref, inject} from "vue";

const {proxy} = getCurrentInstance()
//home页的获取侧边菜单方法，菜单页操作成功后调用
const getMenuListHome = inject('getMenuListHome')

const queryForm = reactive(
    {
        menuState: 1,//菜单状态
        menuName: '', //菜单名称
    },
)
const menuList = ref([])
const columns = ref([
    {
        label: "菜单名称",
        prop: "menuName",
        width: 150,
    },
    {
        label: "图标",
        prop: "icon",
    },
    {
        label: "菜单类型",
        prop: "menuType",
        formatter(row, column, value) {
            return {
                1: "菜单",
                2: "按钮",
            }[value];
        },
    },
    {
        label: "权限标识",
        prop: "menuCode",
    },
    {
        label: "路由地址",
        prop: "path",
    },
    {
        label: "组件路径",
        prop: "component",
    },
    {
        label: "菜单状态",
        prop: "menuState",
        width: 90,
        formatter(row, column, value) {
            return {
                1: "正常",
                2: "停用",
            }[value];
        },
    },
    {
        label: "创建时间",
        prop: "createTime",
        formatter(row, column, value) {
            return utils.formatDate(new Date(value));
        },
    },
],)
const showModal = ref(false)
const menuForm = reactive({
    //没选择父级菜单，传一个null值的数组
    parentId: [null],
    menuType: 1,
    menuState: 1,
},)
const action = ref("")
const rules = reactive({
    menuName: [
        {
            required: true,
            message: "请输入菜单名称",
            trigger: "blur",
        },
        {
            min: 2,
            max: 10,
            message: "长度在2-8个字符",
            trigger: "blur",
        },
    ],
},)

onMounted(() => {
    getMenuList()
})

//获取菜单列表
const getMenuList = async () => {
    try {
        let list = await proxy.$api.getMenuList(queryForm);
        menuList.value = list;
    } catch (e) {
        throw new Error(e);
    }
}
// 表单重置
const handleReset = (form) => {
    proxy.$refs[form].resetFields();
}
// 打开新增菜单
const handleAdd = (type, row) => {
    showModal.value = true;
    action.value = "add";
    if (type == 2) {
        menuForm.parentId = [...row.parentId, row._id].filter(
            (item) => item
        );
    }
}

//打开菜单编辑
const handleEdit = (row) => {
    showModal.value = true;
    action.value = "edit";
    proxy.$nextTick(() => {
        Object.assign(menuForm, row);
    });
}

//删除菜单
const handleDel = (_id) => {
    proxy.$confirm(
        '是否确认删除菜单',
        '',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        })
        .then(() => {
            proxy.$api.menuSubmit({_id, action: "delete"}).then(() => {
                proxy.$message.success("删除成功");
                getMenuList();
                getMenuListHome()
            }).catch(err => {
                console.log(err)
            });
        })
        .catch(() => {
        })
}
// 菜单操作-提交
const handleSubmit = async () => {
    proxy.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
            // let {action, menuForm} = this;
            let params = {action: action.value, ...menuForm};
            let res = await proxy.$api.menuSubmit(params);
            showModal.value = false;
            proxy.$message.success("操作成功");
            handleReset("dialogForm");
            getMenuList();
            getMenuListHome()
        }
    });
}
// 弹框关闭
const handleClose = () => {
    showModal.value = false;
    handleReset("dialogForm");
}

</script>

<style lang="scss">
</style>