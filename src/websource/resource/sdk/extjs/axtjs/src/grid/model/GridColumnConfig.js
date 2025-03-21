/**
 * 그리드 header의 상태를 저장 관리하는 모델
 */
Ext.define('Axt.grid.model.GridColumnConfig', { extend:'Ext.data.Model', 
    fields:[
        {name: 'grid_name',      type: 'string' }, // 그리드의 이름
        {name: 'hide_columns',   type: 'string' }, // 숨겨질 컬럼들
        {name: 'order_columns',  type: 'string' }  // 컬럼 순서
    ]
});
