;
;  gun.asm
;
;  fires a projectile 'Laz' from a gun 'Gun' in its forwards direction
;

; set lazer to inside gun

SET Laz.Pos.X Gun.Pos.X
SET Laz.Pos.Y Gun.Pos.Y
SET Laz.Pos.Z Gun.Pos.Z

SET Laz.Rot.X Gun.Rot.X
SET Laz.Rot.Y Gun.Rot.Y
SET Laz.Rot.Z Gun.Rot.Z

; NOTE: GRAB rotation order is YXZ

; calculate forward direction
; x =  cz * cy + sz * sx * sy
; y =  cx * sy
; z = -sz * cy + cz * sx * sy

COS R0 Laz.Rot.X ;  cx
COS R1 Laz.Rot.Y ;  cy
COS R2 Laz.Rot.Z ;  cz
SIN R3 Laz.Rot.X ;  sx
SIN R4 Laz.Rot.Y ;  sy
SIN R5 Laz.Rot.Z ;  sz
MUL R6 R5 -1     ; -sz

MUL R7 R0 R4     ;  cx * sy

MUL R0 R3 R4     ;  sx * sy

MUL R3 R5 R0     ;  sz * sx * sy
MUL R4 R2 R1     ;  cz * cy
ADD R4 R4 R3     ;  cz * cy + sz * sx * sy

MUL R3 R2 R0     ;  cz * sx * sy
MUL R6 R6 R1     ; -sz * cy
ADD R6 R6 R3     ; -sz * cy + cz * sx * sy

SET R0 R4
SET R1 R7
SET R2 R6

; normalise vector
; x = x / sqrt(x^2 + y^2 + z^2)

MUL R3 R0 R0 ; x^2
MUL R4 R1 R1 ; y^2
MUL R5 R2 R2 ; z^2

ADD R3 R3 R4 ; x^2 + y^2
ADD R3 R3 R5 ; x^2 + y^2 + z^2

SQRT R3 R3   ; length

DIV R0 R0 R3 ; x / length
DIV R1 R1 R3 ; y / length
DIV R2 R2 R3 ; z / length

; apply speed

SET R3 100 ; speed

MUL R0 R0 R3
MUL R1 R1 R3
MUL R2 R2 R3

; infinitely move in direction

LABEL LOOP

    ; multiply movement by delta

    SET R6 DeltaTime

    MUL R3 R0 R6
    MUL R4 R1 R6
    MUL R5 R2 R6

    ; add to lazer position to move it

    ADD Laz.Pos.X R3 Laz.Pos.X
    ADD Laz.Pos.Y R4 Laz.Pos.Y
    ADD Laz.Pos.Z R5 Laz.Pos.Z

    ; only run once per frame

    SLEEP 0

GOTO LOOP

