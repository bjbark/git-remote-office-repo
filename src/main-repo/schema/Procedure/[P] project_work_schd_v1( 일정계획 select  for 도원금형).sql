/*

call project_work_schd_v1('DW-1938')
select * from pjod_work_schd where pjod_idcd = 'DW-1938'



*/


drop procedure if exists project_work_schd_v1 ; 


CREATE procedure `project_work_schd_v1`(
       _pjod_idcd varchar(50)
    )  
begin	

with grup as (	
       select 																								
               pjod_idcd       
             , work_schd_dvcd  
       	     , id                  
       	     , seqn								
             , `name`            
       	     , progress        
       	     , progressbyworklog   
       	     , relevance   
       	     , `type`				
             , typeld          
       	     , description     
       	     , code                
       	     , `level`       
       	     , status				
             , depends         
       	     , `start`           
       	     , duration            
       	     , `end`         
       	     , startismilestone	
             , endismilestone  
       	     , collapsed       
       	     , canwrite            
       	     , canadd      
       	     , wkct_idcd			
             , candelete       
       	     , canaddlssue     
       	     , haschild            
       	     , starttime   
       	     , endtime				
       	     , item_idcd       
       	     , prnt_idcd           
       	     , work_item_idcd
       	     , line_levl			
       from    pjod_work_schd																				
       where   level <= 2
       and     pjod_idcd = _pjod_idcd
     ) , 
     wkct as (
       select 																								
               pjod_idcd       
             , work_schd_dvcd  
       	     , id                  
       	     , min(seqn) as seqn
             , `name`            
       	     , progress        
       	     , progressbyworklog   
       	     , relevance   
       	     , `type`				
             , typeld          
       	     , description     
       	     , code                
       	     , 3 as `level`       
       	     , status				
             , depends         
       	     , `start`           
       	     , duration            
       	     , `end`         
       	     , startismilestone	
             , endismilestone  
       	     , collapsed       
       	     , canwrite            
       	     , canadd      
       	     , wkct_idcd			
             , candelete       
       	     , canaddlssue     
       	     , haschild            
       	     , starttime   
       	     , endtime				
             , item_idcd       
       	     , (select max(prnt_idcd) 
			    from   pjod_work_schd r
				where  r.pjod_idcd = _pjod_idcd 
				and    r.line_levl = 3
				and    r.item_idcd = a.prnt_idcd 
				) as prnt_idcd           
       	     , work_item_idcd
       	     , line_levl			
       from    pjod_work_schd a																			
       where   level = 4
       and     pjod_idcd = _pjod_idcd
	   group by wkct_idcd 
	         , (select max(prnt_idcd) 
			    from   pjod_work_schd r
				where  r.pjod_idcd = _pjod_idcd 
				and    r.line_levl = 3
				and    r.item_idcd = a.prnt_idcd 
				)
    )
    select *
	from (
       select 																								
               pjod_idcd       
             , work_schd_dvcd  
       	     , id                  
       	     , seqn								
             , `name`            
       	     , progress        
       	     , progressbyworklog   
       	     , relevance   
       	     , `type`				
             , typeld          
       	     , description     
       	     , code                
       	     , `level`       
       	     , status				
             , depends         
       	     , `start`           
       	     , duration            
       	     , `end`         
       	     , startismilestone	
             , endismilestone  
       	     , collapsed       
       	     , canwrite            
       	     , canadd      
       	     , wkct_idcd			
             , candelete       
       	     , canaddlssue     
       	     , haschild            
       	     , starttime   
       	     , endtime				
             , item_idcd       
       	     , prnt_idcd           
       	     , work_item_idcd
       	     , line_levl			
       from    grup 																				
	   union all 
       select 																								
               pjod_idcd       
             , work_schd_dvcd  
       	     , id                  
       	     , min(seqn) as seqn								
             , `name`            
       	     , progress        
       	     , progressbyworklog   
       	     , relevance   
       	     , `type`				
             , typeld          
       	     , description     
       	     , code                
       	     , `level`       
       	     , status				
             , depends         
       	     , `start`           
       	     , duration            
       	     , `end`         
       	     , startismilestone	
             , endismilestone  
       	     , collapsed       
       	     , canwrite            
       	     , canadd      
       	     , wkct_idcd			
             , candelete       
       	     , canaddlssue     
       	     , haschild            
       	     , starttime   
       	     , endtime				
             , item_idcd       
       	     , prnt_idcd           
       	     , work_item_idcd
       	     , line_levl			
       from    wkct
	   group by prnt_idcd, wkct_idcd
      ) a 
      order by seqn
;
end	   

