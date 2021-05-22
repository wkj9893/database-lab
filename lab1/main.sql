SELECT * FROM student
SELECT * FROM sc WHERE SCORE >= 80 AND SCORE <=90
SELECT DISTINCT DNAME FROM student 
SELECT COUNT(`S#`) FROM student WHERE SNAME LIKE '王%'
SELECT MAX(SCORE) FROM sc,course WHERE sc.`C#` = course.`C#` AND course.CNAME = '数据库'          SELECT MAX(SCORE) FROM sc WHERE `C#` IN (SELECT `C#` FROM course WHERE CNAME = '数据库')
SELECT student.`S#`,SNAME,`C#`,SCORE FROM student,sc WHERE student.`S#` = sc.`S#` ORDER BY `C#` ASC,SCORE DESC
SELECT sc.`S#`,SNAME,COUNT(*) FROM sc,student WHERE sc.`S#` = student.`S#`  GROUP BY `S#`
