using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IndoorJungle.Web.Migrations
{
    /// <inheritdoc />
    public partial class IsActive : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isActive",
                table: "PlantTasks");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isActive",
                table: "PlantTasks",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
